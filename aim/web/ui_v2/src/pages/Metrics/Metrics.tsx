import React from 'react';
import { isEmpty } from 'lodash-es';

import SelectForm from './components/SelectForm/SelectForm';
import Grouping from './components/Grouping/Grouping';
import Controls from './components/Controls/Controls';

import MetricsBar from './components/MetricsBar/MetricsBar';
import Table from 'components/Table/Table';
import ChartPanel from 'components/ChartPanel/ChartPanel';
import { IMetricProps } from 'types/pages/metrics/Metrics';
import NotificationContainer from 'components/NotificationContainer/NotificationContainer';
import BusyLoaderWrapper from 'components/BusyLoaderWrapper/BusyLoaderWrapper';
import EmptyComponent from 'components/EmptyComponent/EmptyComponent';
import TableLoader from 'components/TableLoader/TableLoader';
import ChartLoader from 'components/ChartLoader/ChartLoader';
import { ILine } from 'types/components/LineChart/LineChart';
import { ChartTypeEnum } from 'utils/d3';
import { ResizeModeEnum } from 'config/enums/tableEnums';
import { RowHeightSize } from 'config/table/tableConfigs';
import ResizePanel from 'components/ResizePanel/ResizePanel';

import './Metrics.scss';

function Metrics(
  props: IMetricProps,
): React.FunctionComponentElement<React.ReactNode> {
  const chartProps: any[] = React.useMemo(() => {
    return (props.lineChartData || []).map(
      (chartData: ILine[], index: number) => ({
        axesScaleType: props.axesScaleType,
        curveInterpolation: props.curveInterpolation,
        displayOutliers: props.displayOutliers,
        highlightMode: props.highlightMode,
        aggregatedData: props.aggregatedData?.filter(
          (data) => data.chartIndex === index,
        ),
        zoom: props.zoom,
        chartTitle: props.chartTitleData[index],
        aggregationConfig: props.aggregationConfig,
        alignmentConfig: props.alignmentConfig,
        onZoomChange: props.onZoomChange,
      }),
    );
  }, [
    props.lineChartData,
    props.axesScaleType,
    props.curveInterpolation,
    props.displayOutliers,
    props.highlightMode,
    props.zoom,
    props.chartTitleData,
    props.aggregatedData,
    props.aggregationConfig,
    props.alignmentConfig,
    props.onZoomChange,
  ]);

  return (
    <div ref={props.wrapperElemRef} className='Metrics__container'>
      <section className='Metrics__section'>
        <div className='Metrics__section__div Metrics__fullHeight'>
          <MetricsBar
            onBookmarkCreate={props.onBookmarkCreate}
            onBookmarkUpdate={props.onBookmarkUpdate}
            onResetConfigData={props.onResetConfigData}
          />
          <div className='Metrics__SelectForm__Grouping__container'>
            <SelectForm
              selectedMetricsData={props.selectedMetricsData}
              onMetricsSelectChange={props.onMetricsSelectChange}
              onSelectRunQueryChange={props.onSelectRunQueryChange}
              onSelectAdvancedQueryChange={props.onSelectAdvancedQueryChange}
              toggleSelectAdvancedMode={props.toggleSelectAdvancedMode}
            />
            <Grouping
              groupingData={props.groupingData}
              groupingSelectOptions={props.groupingSelectOptions}
              onGroupingSelectChange={props.onGroupingSelectChange}
              onGroupingModeChange={props.onGroupingModeChange}
              onGroupingPaletteChange={props.onGroupingPaletteChange}
              onGroupingReset={props.onGroupingReset}
              onGroupingApplyChange={props.onGroupingApplyChange}
              onGroupingPersistenceChange={props.onGroupingPersistenceChange}
            />
          </div>
          <div
            ref={props.chartElemRef}
            className={`Metrics__chart__container${
              props.resizeMode === ResizeModeEnum.MaxHeight ? '__hide' : ''
            }`}
          >
            <BusyLoaderWrapper
              isLoading={props.requestIsPending}
              className='Metrics__loader'
              height='100%'
              loaderComponent={<ChartLoader />}
            >
              {!!props.lineChartData?.[0]?.length ? (
                <ChartPanel
                  key={props.lineChartData?.length}
                  ref={props.chartPanelRef}
                  panelResizing={props.panelResizing}
                  chartType={ChartTypeEnum.LineChart}
                  data={props.lineChartData}
                  focusedState={props.focusedState}
                  tooltip={props.tooltip}
                  alignmentConfig={props.alignmentConfig}
                  zoom={props.zoom}
                  onActivePointChange={props.onActivePointChange}
                  chartProps={chartProps}
                  resizeMode={props.resizeMode}
                  controls={
                    <Controls
                      selectOptions={props.groupingSelectOptions}
                      tooltip={props.tooltip}
                      smoothingAlgorithm={props.smoothingAlgorithm}
                      smoothingFactor={props.smoothingFactor}
                      curveInterpolation={props.curveInterpolation}
                      displayOutliers={props.displayOutliers}
                      zoom={props.zoom}
                      highlightMode={props.highlightMode}
                      aggregationConfig={props.aggregationConfig}
                      axesScaleType={props.axesScaleType}
                      alignmentConfig={props.alignmentConfig}
                      onChangeTooltip={props.onChangeTooltip}
                      onDisplayOutliersChange={props.onDisplayOutliersChange}
                      onZoomChange={props.onZoomChange}
                      onHighlightModeChange={props.onHighlightModeChange}
                      onAxesScaleTypeChange={props.onAxesScaleTypeChange}
                      onSmoothingChange={props.onSmoothingChange}
                      onAggregationConfigChange={
                        props.onAggregationConfigChange
                      }
                      onAlignmentTypeChange={props.onAlignmentTypeChange}
                      onAlignmentMetricChange={props.onAlignmentMetricChange}
                      projectsDataMetrics={props.projectsDataMetrics}
                    />
                  }
                />
              ) : (
                !props.requestIsPending && (
                  <EmptyComponent
                    size='big'
                    content="It's super easy to search Aim experiments. Lookup search docs to learn more."
                  />
                )
              )}
            </BusyLoaderWrapper>
          </div>
          <ResizePanel
            panelResizing={props.panelResizing}
            resizeElemRef={props.resizeElemRef}
            resizeMode={props.resizeMode}
            onTableResizeModeChange={props.onTableResizeModeChange}
          />
          <div
            ref={props.tableElemRef}
            className={`Metrics__table__container${
              props.resizeMode === ResizeModeEnum.Hide ? '__hide' : ''
            }`}
          >
            <BusyLoaderWrapper
              isLoading={props.requestIsPending}
              className='Metrics__loader'
              height='100%'
              loaderComponent={<TableLoader />}
            >
              {!isEmpty(props.tableData) ? (
                <Table
                  // deletable
                  custom
                  ref={props.tableRef}
                  data={props.tableData}
                  columns={props.tableColumns}
                  // Table options
                  topHeader
                  groups={!Array.isArray(props.tableData)}
                  rowHeight={props.tableRowHeight}
                  rowHeightMode={
                    props.tableRowHeight === RowHeightSize.sm
                      ? 'small'
                      : props.tableRowHeight === RowHeightSize.md
                      ? 'medium'
                      : 'large'
                  }
                  sortOptions={props.groupingSelectOptions}
                  sortFields={props.sortFields}
                  hiddenRows={props.hiddenMetrics}
                  hiddenColumns={props.hiddenColumns}
                  resizeMode={props.resizeMode}
                  // Table actions
                  onSort={props.onSortChange}
                  onSortReset={props.onSortReset}
                  onExport={props.onExportTableData}
                  onManageColumns={props.onColumnsOrderChange}
                  onColumnsVisibilityChange={props.onColumnsVisibilityChange}
                  onTableDiffShow={props.onTableDiffShow}
                  onRowHeightChange={props.onRowHeightChange}
                  onRowsChange={props.onMetricVisibilityChange}
                  onRowHover={props.onTableRowHover}
                  onRowClick={props.onTableRowClick}
                  onTableResizeModeChange={props.onTableResizeModeChange}
                />
              ) : null}
            </BusyLoaderWrapper>
          </div>
        </div>
      </section>
      {props.notifyData?.length > 0 && (
        <NotificationContainer
          handleClose={props.onNotificationDelete}
          data={props.notifyData}
        />
      )}
    </div>
  );
}

export default React.memo(Metrics);
