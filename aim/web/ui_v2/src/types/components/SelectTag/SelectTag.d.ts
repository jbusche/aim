export interface ITagLabelProps {
  label: string;
  color: string;
  onDelete?: (label: string) => void;
}