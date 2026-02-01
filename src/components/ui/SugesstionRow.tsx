import AudioPlayer from '../AudioPlayer';
import { motion } from 'framer-motion';

interface ComunitySuggestion {
  id: string;
  communityWord: string;
  audioUrl?: string;
  votes: number;
}

export function SugesstionsRow({
  suggestion,
  index,
}: {
  suggestion: ComunitySuggestion;
  index: number;
}) {
  return (
    <div className="space-y-6 md:space-y-8 lg:space-y-10">
      {/* Suggestions List - Responsive Grid */}
      <div className="md:rounded-[2rem] lg:rounded-[2.5rem]shadow-soft overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02]">
        <motion.div
          key={suggestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          className="mx-6 md:mx-8 lg:mx-10 py-1 md:py-6 lg:py-8 border-blast:border-0"
        >
          <div>
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-2 text-sm md:text-base text-neutral-600">
                <span>{(index + 1).toString().padStart(2, '0')}.</span>
                <span>{suggestion.communityWord}</span>
              </div>
              <div className="flex justify-end self-end text-sm md:text-base pl-8 md:px-3 py-1 md:py-1.5">
                <AudioPlayer
                  className="self-end"
                  audioUrl={suggestion.audioUrl || ''}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
