'use client';

import { useState } from 'react';
import { Loader2, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateRequest } from '@/actions/review';
import { toast } from 'sonner';

interface PartOfSpeech {
  id: number;
  name: string;
  code: string;
}

interface RequestEditFormProps {
  requestId: number;
  initialWord: string;
  initialMeaning: string | null;
  initialPartOfSpeechId: number;
  partsOfSpeech: PartOfSpeech[];
  onSave: (updated: {
    word: string;
    meaning: string | null;
    partOfSpeechId: number;
    partOfSpeechName: string;
  }) => void;
  onCancel: () => void;
}

export function RequestEditForm({
  requestId,
  initialWord,
  initialMeaning,
  initialPartOfSpeechId,
  partsOfSpeech,
  onSave,
  onCancel,
}: RequestEditFormProps) {
  const [word, setWord] = useState(initialWord);
  const [meaning, setMeaning] = useState(initialMeaning ?? '');
  const [partOfSpeechId, setPartOfSpeechId] = useState(
    String(initialPartOfSpeechId)
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!word.trim()) {
      toast.error('Word cannot be empty');
      return;
    }

    setSaving(true);
    const res = await updateRequest(requestId, {
      word: word.trim(),
      meaning: meaning.trim() || null,
      partOfSpeechId: Number(partOfSpeechId),
    });

    if (res.success) {
      const pos = partsOfSpeech.find(p => p.id === Number(partOfSpeechId));
      toast.success('Request updated');
      onSave({
        word: word.trim(),
        meaning: meaning.trim() || null,
        partOfSpeechId: Number(partOfSpeechId),
        partOfSpeechName: pos?.name ?? '',
      });
    } else {
      toast.error(res.error ?? 'Failed to update request');
    }
    setSaving(false);
  };

  return (
    <div className="space-y-3 pt-2">
      {/* Word */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-neutral-500">Word</label>
        <Input
          value={word}
          onChange={e => setWord(e.target.value)}
          placeholder="Word"
          className="h-9 text-sm"
        />
      </div>

      {/* Meaning */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-neutral-500">
          Meaning / Context
        </label>
        <textarea
          value={meaning}
          onChange={e => setMeaning(e.target.value)}
          placeholder="Context or meaning (optional)"
          rows={2}
          className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {/* Part of Speech */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-neutral-500">
          Part of Speech
        </label>
        <Select value={partOfSpeechId} onValueChange={setPartOfSpeechId}>
          <SelectTrigger className="h-9 text-sm">
            <SelectValue placeholder="Select part of speech" />
          </SelectTrigger>
          <SelectContent>
            {partsOfSpeech.map(pos => (
              <SelectItem key={pos.id} value={String(pos.id)}>
                {pos.name}
                <span className="ml-1 text-neutral-400 text-xs">
                  ({pos.code})
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={onCancel}
          disabled={saving}
          leftIcon={<X className="w-3.5 h-3.5" />}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={handleSave}
          disabled={saving}
          leftIcon={
            saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Check className="w-3.5 h-3.5" />
            )
          }
        >
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </div>
  );
}
