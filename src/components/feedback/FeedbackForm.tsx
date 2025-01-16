import { useTranslation } from 'react-i18next';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FeedbackFormProps {
  type: string;
  title: string;
  description: string;
  onTypeChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export const FeedbackForm = ({
  type,
  title,
  description,
  onTypeChange,
  onTitleChange,
  onDescriptionChange,
}: FeedbackFormProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="type">{t('feedback.type.label')}</Label>
        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger>
            <SelectValue placeholder={t('feedback.type.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bug">{t('feedback.type.bug')}</SelectItem>
            <SelectItem value="feature">{t('feedback.type.feature')}</SelectItem>
            <SelectItem value="support">{t('feedback.type.support')}</SelectItem>
            <SelectItem value="other">{t('feedback.type.other')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">{t('feedback.form.title.label')}</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder={t('feedback.form.title.placeholder')}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{t('feedback.form.description.label')}</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder={t('feedback.form.description.placeholder')}
          rows={5}
        />
      </div>
    </div>
  );
};