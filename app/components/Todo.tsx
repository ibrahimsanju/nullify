import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { memo } from 'react';

interface TodoProps{
    label:string
}


const Todo = ({label}:TodoProps) => {
  return (
    <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">{label}</Label>
    </div>
  );
};

export default memo(Todo);