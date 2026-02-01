import type { DicoWord } from '@/types';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Lightbulb,
  LineChart,
  Vote,
  VoteIcon,
} from 'lucide-react';
import { SugesstionsRow } from './SugesstionRow';

import { useState } from 'react';
import { Button } from './Button';

export function NeoDicoWord({
  word,
  translation,
  definition,
  partOfSpeech,
  languageName,
  index,
  translations,
}: DicoWord) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = 'Top Suggestion Ranking';
  return (
    <motion.div
      key={word}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      className="bg-white  rounded-xl  border border-neutral-200 shadow-soft overflow-hidden hover:shadow-lg transition-all hover:scale-[1.02]"
    >
      <div className={`p-4 bg-white `}>
        <div className={`p-2 w-full  rounded-xl bg-white`}>
          <div className="mb-2">
            <span className="font-[400] text-[16px] text-neutral-950">
              {word}
            </span>
          </div>
          <div className="mb-1">
            <em className="font-[400] text-[16px] text-[#A30202] mr-1">
              NeoDiko {languageName}:
            </em>
            <span className="font-[500] text-[16px] text-[#111111CC]">
              {translation}
            </span>
          </div>

          <div className="mb-2">
            <div className="italic text-neutral-600 mb-2">
              <em>{partOfSpeech ?? 'noun'}</em>
            </div>
            <span>{definition}</span>
          </div>
          {/* Suggestions Dropdown */}
          <div className="relative w-full border-[#EFEFEF] border  bg-[#fafafa] rounded-lg">
            {/* Trigger Div */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center w-full justify-between p-3 cursor-pointer hover:bg-gray-50 transition-all"
            >
              <div className="relative">
                <LineChart className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <span className="w-full py-[25px] pl-10  font-[500] text-[13px]">
                  {selected}
                </span>
              </div>
              <ChevronDown
                className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                size={20}
              />
            </div>

            {/* Expandable Content Area */}
            <div
              className={`w-full
                grid transition-all duration-300 ease-in-out
                ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}
            `}
            >
              <div className="overflow-hidden border">
                {translations?.map((translation_, index) => (
                  <SugesstionsRow
                    key={translation_.id}
                    suggestion={translation_}
                    index={index}
                  />
                ))}
                <div className="flex flex-row w-full justify-center pb-2">
                  <Button
                    variant="outline"
                    size="sm"
                    // onClick={handleGoBack}
                    className="ml-2 mt-2 md:mt-4 lg:mt-6 h-8 md:h-10 lg:h-12 text-base md:text-lg font-medium rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all w-50"
                  >
                    <Lightbulb className="w-5 h-5" /> Curate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    // onClick={handleSubmitAnother}
                    className="mr-2 mt-2 md:mt-4 lg:mt-6 ml-4 h-8 md:h-10 lg:h-12 text-base md:text-lg font-medium rounded-full md:rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all w-50"
                  >
                    <VoteIcon className="w-5 h-5" /> Vote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
