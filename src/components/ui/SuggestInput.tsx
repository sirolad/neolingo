import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import {
  Brain,
  Circle,
  Info,
  Recycle,
  Star,
  Trash,
  TreePalmIcon,
  Wrench,
} from 'lucide-react';
import { Input } from './Input';
import AudioRecorder from '../AudioRecorder';

const typeIcon = (type: string) => {
  switch (type) {
    case 'popular':
      return <Star className="text-[#111111CC] dark:text-[#FFFFFFCC]" />;
    case 'adoptive':
      return <Recycle className="text-[#111111CC] dark:text-[#FFFFFFCC]" />;
    case 'functional':
      return <Wrench className="text-[#111111CC] dark:text-[#FFFFFFCC]" />;
    case 'root':
      return (
        <TreePalmIcon className="text-[#111111CC] dark:text-[#FFFFFFCC]" />
      );
    case 'non-conforming':
    case 'creative':
      return <Brain className="text-[#111111CC] dark:text-[#FFFFFFCC]" />;
    default:
      return <Circle className="text-[#111111CC] dark:text-[#FFFFFFCC]" />;
  }
};

export default function SuggestInput({
  type,
  value,
  label,
  onInfoClick,
  onChange,
  onInput,
  canDelete = true,
  onDelete,
  onAudioChange,
}: {
  type: string;
  value: string;
  label: string;
  onInfoClick?: () => void;
  onChange?: (value: string) => void;
  onInput?: (value: string) => void;
  canDelete?: boolean;
  onDelete?: () => void;
  onAudioChange?: (url: string) => void;
}) {
  const inputText = value;
  const modalTitle = (
    <>
      <span className="flex items-center gap-2">
        {typeIcon(type)} {label}
      </span>
    </>
  );

  return (
    <div className="space-y-2 md:space-y-3">
      <div className="flex items-center gap-2">
        <Select
          onValueChange={value => {
            onChange?.(value);
          }}
        >
          <SelectTrigger className="inline-flex items-center text-neutral-950 dark:text-neutral-50 hover:text-primary-800 dark:hover:text-primary-200 transition-colors p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <div className="flex items-center gap-2">{modalTitle}</div>
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-lg shadow-lg">
            <SelectItem
              value="popular"
              className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 px-4 py-2"
            >
              <div className="flex items-center gap-2">
                {typeIcon('popular')} Popular
              </div>
            </SelectItem>
            <SelectItem
              value="adoptive"
              className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 px-4 py-2"
            >
              <div className="flex items-center gap-2">
                {typeIcon('adoptive')} Adoptive
              </div>
            </SelectItem>
            <SelectItem
              value="creative"
              className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 px-4 py-2"
            >
              <div className="flex items-center gap-2">
                {typeIcon('creative')} Creative
              </div>
            </SelectItem>
            <SelectItem
              value="functional"
              className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 px-4 py-2"
            >
              <div className="flex items-center gap-2">
                {typeIcon('functional')} Functional
              </div>
            </SelectItem>
            <SelectItem
              value="root"
              className="cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 px-4 py-2"
            >
              <div className="flex items-center gap-2">
                {typeIcon('root')} Root
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <Info
          onClick={onInfoClick}
          className="inline-block w-5 h-5 ml-1 text-black-600"
        />
        {canDelete && (
          <Trash
            className="inline-block w-5 h-5 ml-auto text-error-600 cursor-pointer"
            onClick={onDelete}
          />
        )}
      </div>
      <div className="flex flex-row pb-4">
        <div className="w-50">
          <Input
            type="text"
            placeholder="Type here"
            value={inputText}
            onChange={e => {
              onInput?.(e.target.value);
            }}
            className="h-12 md:h-14 lg:h-16 text-caption md:text-caption lg:text-base"
          />
        </div>
        <div className="w-50 ml-4 flex items-center">
          <AudioRecorder
            onRecord={url => {
              onAudioChange?.(url);
            }}
          />
        </div>
      </div>
    </div>
  );
}
