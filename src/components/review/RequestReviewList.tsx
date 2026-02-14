'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  RefreshCw,
  Wand2,
  ShieldAlert,
  BadgeCheck,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { getPendingRequests, reviewRequest } from '@/actions/review';
import { analyzeRequest, ReviewResult } from '@/actions/ai-review';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Request {
  id: number;
  word: string;
  meaning: string | null;
  user: {
    name: string | null;
  };
  targetLanguage: {
    name: string;
  };
  createdAt: Date;
}

export function RequestReviewList() {
  const { appUser } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [aiResults, setAiResults] = useState<
    Record<number, ReviewResult | null>
  >({});
  const LIMIT = 10;

  useEffect(() => {
    loadRequests(0);
  }, []);

  const loadRequests = async (currentOffset: number) => {
    if (currentOffset === 0) setLoading(true);
    else setLoadingMore(true);

    const res = await getPendingRequests(LIMIT, currentOffset);

    if (res.success && res.data) {
      if (currentOffset === 0) {
        setRequests(res.data);
      } else {
        setRequests(prev => [...prev, ...res.data]);
      }
      setHasMore(res.data.length === LIMIT);
      setOffset(currentOffset + LIMIT);
    } else {
      toast.error('Failed to load requests');
    }
    setLoading(false);
    setLoadingMore(false);
  };

  const handleLoadMore = () => {
    loadRequests(offset);
  };

  const handleReview = async (
    id: number,
    status: 'APPROVED' | 'REJECTED',
    reason?: string
  ) => {
    if (!appUser?.id) return;

    // Optimistic update
    setRequests(prev => prev.filter(req => req.id !== id));

    const res = await reviewRequest(id, status, appUser.id, reason);

    if (res.success) {
      toast.success(`Request ${status.toLowerCase()}`);
    } else {
      toast.error('Failed to update status');
      loadRequests(0); // Revert on failure
    }
  };

  const handleAiAnalysis = async (req: Request) => {
    setAnalyzingId(req.id);
    const res = await analyzeRequest({ word: req.word, meaning: req.meaning });
    if (res.success && res.data) {
      setAiResults(prev => ({ ...prev, [req.id]: res.data }));
    } else {
      toast.error('AI Analysis failed');
    }
    setAnalyzingId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center p-12">
        <RefreshCw className="w-6 h-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center p-12 text-neutral-500">
        No pending requests to review.
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <AnimatePresence>
        {requests.map(req => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="heading-5 text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                      {req.word}
                      <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {req.targetLanguage.name}
                      </span>
                    </h3>
                    <p className="body-small text-neutral-500">
                      Requested by {req.user.name || 'Unknown'}
                    </p>
                  </div>
                  {/* AI Badge if analyzed */}
                  {aiResults[req.id] && (
                    <div
                      className={`p-2 rounded-lg text-xs font-medium border flex items-center gap-2 ${
                        aiResults[req.id]?.strictDict === 'Approved'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : aiResults[req.id]?.strictDict === 'Rejected'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}
                    >
                      {aiResults[req.id]?.strictDict === 'Approved' && (
                        <BadgeCheck className="w-4 h-4" />
                      )}
                      {aiResults[req.id]?.strictDict === 'Rejected' && (
                        <ShieldAlert className="w-4 h-4" />
                      )}
                      {aiResults[req.id]?.strictDict === 'Needs Review' && (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                      <span
                        className="max-w-[150px] truncate"
                        title={aiResults[req.id]?.reason}
                      >
                        {aiResults[req.id]?.reason} ({aiResults[req.id]?.score}
                        %)
                      </span>
                    </div>
                  )}
                </div>

                {req.meaning && (
                  <div className="bg-neutral-50 dark:bg-neutral-800 p-3 rounded-lg text-sm text-neutral-700 dark:text-neutral-300 italic">
                    "{req.meaning}"
                  </div>
                )}
              </div>

              <div className="flex flex-row md:flex-col gap-2 justify-center min-w-[140px]">
                {!aiResults[req.id] && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-full"
                    onClick={() => handleAiAnalysis(req)}
                    disabled={analyzingId === req.id}
                    leftIcon={
                      <Wand2
                        className={`w-4 h-4 ${analyzingId === req.id ? 'animate-spin' : ''}`}
                      />
                    }
                  >
                    {analyzingId === req.id ? 'Analyzing...' : 'Ask AI'}
                  </Button>
                )}

                <div className="flex gap-2 w-full">
                  <Button
                    variant="outline"
                    className="flex-1 text-red-600 border-red-100 hover:bg-red-50 hover:border-red-200 rounded-full"
                    onClick={() => handleReview(req.id, 'REJECTED')}
                    leftIcon={<X className="w-4 h-4" />}
                  >
                    Reject
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full"
                    onClick={() => handleReview(req.id, 'APPROVED')}
                    leftIcon={<Check className="w-4 h-4" />}
                  >
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {hasMore && !loading && (
        <div className="flex justify-center pt-4 pb-8">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="rounded-full"
            leftIcon={
              loadingMore ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : undefined
            }
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}
