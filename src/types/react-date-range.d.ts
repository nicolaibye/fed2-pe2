declare module "react-date-range" {
  import * as React from "react";

  export interface Range {
    startDate: Date | null;
    endDate: Date | null;
    key: string;
  }

  export interface OnChangeProps {
    selection: Range;
  }

  export interface DateRangeProps {
    onChange: (item: OnChangeProps) => void;
    moveRangeOnFirstSelection?: boolean;
    showSelectionPreview?: boolean;
    className?: string;
    ranges: Range[];
  }

  export class DateRange extends React.Component<DateRangeProps> {}
}
