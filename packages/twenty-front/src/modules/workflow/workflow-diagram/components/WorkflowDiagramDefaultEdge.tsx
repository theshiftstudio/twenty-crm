import { WorkflowDiagramEdgeV1 } from '@/workflow/workflow-diagram/components/WorkflowDiagramEdgeV1';
import { WorkflowDiagramEdgeV2Empty } from '@/workflow/workflow-diagram/components/WorkflowDiagramEdgeV2Empty';
import { WorkflowDiagramEdgeV2Filter } from '@/workflow/workflow-diagram/components/WorkflowDiagramEdgeV2Filter';
import { CREATE_STEP_NODE_WIDTH } from '@/workflow/workflow-diagram/constants/CreateStepNodeWidth';
import { EDGE_GRAY_CIRCLE_MARKED_ID } from '@/workflow/workflow-diagram/constants/EdgeGrayCircleMarkedId';
import { EDGE_GREEN_CIRCLE_MARKED_ID } from '@/workflow/workflow-diagram/constants/EdgeGreenCircleMarkedId';
import { EDGE_GREEN_ROUNDED_ARROW_MARKER_ID } from '@/workflow/workflow-diagram/constants/EdgeGreenRoundedArrowMarkerId';
import { EDGE_ROUNDED_ARROW_MARKER_ID } from '@/workflow/workflow-diagram/constants/EdgeRoundedArrowMarkerId';
import { WorkflowDiagramEdge } from '@/workflow/workflow-diagram/types/WorkflowDiagram';
import { useIsFeatureEnabled } from '@/workspace/hooks/useIsFeatureEnabled';
import { Theme, useTheme } from '@emotion/react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getStraightPath,
} from '@xyflow/react';
import { isDefined } from 'twenty-shared/utils';
import { StepStatus } from 'twenty-shared/workflow';
import { FeatureFlagKey } from '~/generated/graphql';

type WorkflowDiagramDefaultEdgeProps = EdgeProps<WorkflowDiagramEdge>;

const toMarkerId = (id: string) => `url(#${id})`;

const getMarkerStart = (edgeExecutionStatus: StepStatus | undefined) => {
  if (edgeExecutionStatus === StepStatus.SUCCESS) {
    return EDGE_GREEN_CIRCLE_MARKED_ID;
  }

  return EDGE_GRAY_CIRCLE_MARKED_ID;
};

const getMarkerEnd = (edgeExecutionStatus: StepStatus | undefined) => {
  if (edgeExecutionStatus === StepStatus.SUCCESS) {
    return EDGE_GREEN_ROUNDED_ARROW_MARKER_ID;
  }

  return EDGE_ROUNDED_ARROW_MARKER_ID;
};

const getStrokeColor = ({
  theme,
  edgeExecutionStatus,
}: {
  theme: Theme;
  edgeExecutionStatus: StepStatus | undefined;
}) => {
  if (edgeExecutionStatus === StepStatus.SUCCESS) {
    return theme.tag.text.turquoise;
  }

  return theme.border.color.strong;
};

export const WorkflowDiagramDefaultEdge = ({
  source,
  target,
  sourceY,
  targetY,
  data,
}: WorkflowDiagramDefaultEdgeProps) => {
  const theme = useTheme();

  const isWorkflowFilteringEnabled = useIsFeatureEnabled(
    FeatureFlagKey.IS_WORKFLOW_FILTERING_ENABLED,
  );

  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX: CREATE_STEP_NODE_WIDTH,
    sourceY,
    targetX: CREATE_STEP_NODE_WIDTH,
    targetY,
  });

  if (!isDefined(data)) {
    throw new Error('Edge data is not defined');
  }

  const displayEdgeV1 = !isWorkflowFilteringEnabled && data.isEdgeEditable;
  const displayEmptyFilters =
    isWorkflowFilteringEnabled &&
    data.edgeType === 'default' &&
    data.isEdgeEditable;
  const displayFilters =
    isWorkflowFilteringEnabled && data.edgeType === 'filter';

  const markerStart = getMarkerStart(data.edgeExecutionStatus);
  const markerEnd = getMarkerEnd(data.edgeExecutionStatus);

  return (
    <>
      <BaseEdge
        markerStart={toMarkerId(markerStart)}
        markerEnd={toMarkerId(markerEnd)}
        path={edgePath}
        style={{
          stroke: getStrokeColor({
            theme,
            edgeExecutionStatus: data.edgeExecutionStatus,
          }),
        }}
      />

      <EdgeLabelRenderer>
        {displayEdgeV1 && (
          <WorkflowDiagramEdgeV1
            labelY={labelY}
            parentStepId={source}
            nextStepId={target}
          />
        )}
        {displayEmptyFilters && (
          <WorkflowDiagramEdgeV2Empty
            labelX={labelX}
            labelY={labelY}
            parentStepId={source}
            nextStepId={target}
          />
        )}
        {displayFilters && (
          <WorkflowDiagramEdgeV2Filter
            labelX={labelX}
            labelY={labelY}
            stepId={data.stepId}
            parentStepId={source}
            nextStepId={target}
            filterSettings={data.filterSettings}
            isEdgeEditable={data.isEdgeEditable}
            name={data.name}
            runStatus={data.runStatus}
          />
        )}
      </EdgeLabelRenderer>
    </>
  );
};
