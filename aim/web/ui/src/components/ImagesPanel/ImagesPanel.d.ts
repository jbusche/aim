import React from 'react';

import { ResizeModeEnum } from 'config/enums/tableEnums';

import {
  IFocusedState,
  ITooltipContent,
} from 'types/services/models/metrics/metricsAppModel';
import { IImagesExploreAppConfig } from 'types/services/models/imagesExplore/imagesExploreAppModel';

export interface IImagesPanelProps {
  imagesData: any;
  orderedMap: { [key: string]: any };
  recordSlice: number[];
  indexSlice: number[];
  indexRange: number[];
  stepRange: number[];
  indexDensity: number;
  recordDensity: number;
  onSliceRangeChange: (key: string, newValue: number[] | number) => void;
  onDensityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getImagesBlobsData: (uris: string[]) => Promise;
  isLoading: boolean;
  applyButtonDisabled: boolean;
  isRangePanelShow: boolean;
  panelResizing: boolean;
  imageWrapperOffsetHeight: number;
  imageWrapperOffsetWidth: number;
  controls?: React.ReactNode;
  resizeMode: ResizeModeEnum;
  tooltip: ITooltipContent;
  focusedState: IFocusedState;
  imageProperties: IImagesExploreAppConfig['images']['imageProperties'];
  onActivePointChange?: (activePoint: any, focusedStateActive: boolean) => void;
  tableHeight: string;
}