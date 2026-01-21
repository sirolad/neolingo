interface WordOfTheDayProps {
  word: string;
  definition: string;
  partOfSpeech?: string;
  innerBgClassName?: string;
}

export function WordOfTheDay({
  word,
  definition,
  partOfSpeech,
  innerBgClassName,
}: WordOfTheDayProps) {
  return (
    <div
      className={`mb-4 p-4 bg-white rounded-3xl md:rounded-[2rem] lg:rounded-[2.5rem] border border-neutral-100 shadow-soft overflow-hidden hover:shadow-lg transition-shadow`}
    >
      <h2 className="text-lg font-semibold mb-2 rounded-lg">Word of the Day</h2>
      <div
        className={`p-4 w-full  border rounded-xl ${innerBgClassName || 'bg-blue-50 border-blue-200'}`}
      >
        <span className="text-sm">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-950">
            {word}
          </h3>
          <div className="italic text-neutral-600 mb-2">
            {partOfSpeech ?? 'noun'}
          </div>
          <span>{definition}</span>
        </span>
      </div>
    </div>
  );
}
