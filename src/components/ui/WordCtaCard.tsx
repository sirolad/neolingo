import { motion } from 'framer-motion';
import { Button } from './Button';
import { Lightbulb, PlusSquare, Vote } from 'lucide-react';

export function CtaCard({
  title,
  subTitle,
  word,
  ctatext,
  variant,
  onHandleClick,
}: {
  title: string;
  subTitle: string;
  word: string;
  ctatext?: string;
  variant: 'suggest' | 'vote' | 'request';
  onHandleClick: () => void;
}) {
  switch (variant) {
    case 'suggest':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Card Header */}
          <div className="p-6 md:p-8 lg:p-10 pb-4 md:pb-6 lg:pb-8">
            <span className="text-[14px] md:text-2xl lg:text-3xl font-bold text-neutral-950 mb-1 md:mb-2">
              {title}
            </span>
            <p className="text-neutral-600 text-[12px] md:text-base lg:text-lg">
              {subTitle}
            </p>
          </div>

          {/* Word Display */}
          <div
            className={`mx-6 md:mx-8 lg:mx-10 mb-6 md:mb-8 lg:mb-10 bg-blue-50 border-blue-200 border rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8`}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
              <div
                className={`px-3 md:px-4 lg:px-5 py-1 md:py-1.5 lg:py-2 rounded-full text-xs md:text-sm lg:text-base font-medium bg-blue-100 text-blue-800`}
              >
                {ctatext}
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={onHandleClick}
                leftIcon={
                  <Lightbulb className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                }
                className="h-8 md:h-10 lg:h-12 px-4 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl text-xs md:text-sm lg:text-base font-medium hover:scale-105 active:scale-95 transition-transform"
              >
                Curate
              </Button>
            </div>
            <span className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-950">
              {word}
            </span>
          </div>
        </motion.div>
      );
    case 'vote':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Card Header */}
          <div className="p-6 md:p-8 lg:p-10 pb-4 md:pb-6 lg:pb-8">
            <span className="text-[14px] md:text-2xl lg:text-3xl font-bold text-neutral-950 mb-1 md:mb-2">
              {title}
            </span>
            <p className="text-neutral-600 text-[12px] md:text-base lg:text-lg">
              {subTitle}
            </p>
          </div>

          {/* Word Display */}
          <div
            className={`mx-6 md:mx-8 lg:mx-10 mb-6 md:mb-8 lg:mb-10 bg-[#e4fde4] border-[#c8fac9] border rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8`}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
              <div
                className={`px-3 md:px-4 lg:px-5 py-1 md:py-1.5 lg:py-2 rounded-full text-xs md:text-sm lg:text-base font-medium bg-[#e4fde4] text-[#50954d]`}
              >
                {ctatext}
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={onHandleClick}
                leftIcon={
                  <Vote className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                }
                className="h-8 md:h-10 lg:h-12 px-4 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl text-xs md:text-sm lg:text-base font-medium hover:scale-105 active:scale-95 transition-transform"
              >
                Vote
              </Button>
            </div>
            <span className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-950">
              {word}
            </span>
          </div>
        </motion.div>
      );
    case 'request':
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Card Header */}
          <div className="p-6 md:p-8 lg:p-10 pb-4 md:pb-6 lg:pb-8">
            <span className="text-[14px] md:text-2xl lg:text-3xl font-bold text-neutral-950 mb-1 md:mb-2">
              {title}
            </span>
            <p className="text-neutral-600 text-[12px] md:text-base lg:text-lg">
              {subTitle}
            </p>
          </div>

          {/* Word Display */}
          <div
            className={`mx-6 md:mx-8 lg:mx-10 mb-6 md:mb-8 lg:mb-10 bg-[#f8f3fd] border-[#eaddf7] border rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8`}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
              <div
                className={`px-3 md:px-4 lg:px-5 py-1 md:py-1.5 lg:py-2 rounded-full text-xs md:text-sm lg:text-base font-medium bg-[#f8f3fd] text-[#292929]`}
              >
                {ctatext}
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={onHandleClick}
                leftIcon={
                  <PlusSquare className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                }
                className="h-8 md:h-10 lg:h-12 px-4 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl text-xs md:text-sm lg:text-base font-medium hover:scale-105 active:scale-95 transition-transform"
              >
                Request
              </Button>
            </div>
            <span className="text-[12px] md:text-[16px] lg:text-4xl font-light text-[#6826af]">
              {word}
            </span>
          </div>
        </motion.div>
      );
    default:
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
        >
          {/* Card Header */}
          <div className="p-6 md:p-8 lg:p-10 pb-4 md:pb-6 lg:pb-8">
            <span className="text-[14px] md:text-2xl lg:text-3xl font-bold text-neutral-950 mb-1 md:mb-2">
              {title}
            </span>
            <p className="text-neutral-600 text-[12px] md:text-base lg:text-lg">
              {subTitle}
            </p>
          </div>

          {/* Word Display */}
          <div
            className={`mx-6 md:mx-8 lg:mx-10 mb-6 md:mb-8 lg:mb-10 bg-blue-50 border-blue-200 border rounded-xl md:rounded-2xl lg:rounded-3xl p-4 md:p-6 lg:p-8`}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4 lg:mb-6">
              <div
                className={`px-3 md:px-4 lg:px-5 py-1 md:py-1.5 lg:py-2 rounded-full text-xs md:text-sm lg:text-base font-medium bg-blue-100 text-blue-800`}
              >
                {ctatext || 'Word of the day'}
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={onHandleClick}
                leftIcon={
                  <Lightbulb className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                }
                className="h-8 md:h-10 lg:h-12 px-4 md:px-6 lg:px-8 rounded-2xl md:rounded-3xl text-xs md:text-sm lg:text-base font-medium hover:scale-105 active:scale-95 transition-transform"
              >
                Curate
              </Button>
            </div>
            <span className="text-2xl md:text-3xl lg:text-4xl font-light text-neutral-950">
              {word}
            </span>
          </div>
        </motion.div>
      );
  }
}
