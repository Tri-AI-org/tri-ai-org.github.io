import _styled from "@emotion/styled/base";
import PropTypes from 'prop-types';
import React from 'react';
import { List, Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { lengths } from 'decap-cms-ui-default';
import { connect } from 'react-redux';
import { encodeEntry } from '../../../lib/stega';
import { resolveWidget, getPreviewTemplate, getPreviewStyles, getRemarkPlugins, getEditorComponents } from '../../../lib/registry';
import { getAllEntries, tryLoadEntry } from '../../../actions/entries';
import { ErrorBoundary } from '../../UI';
import { selectTemplateName, selectInferredField, selectField } from '../../../reducers/collections';
import { boundGetAsset } from '../../../actions/media';
import { selectIsLoadingAsset } from '../../../reducers/medias';
import { INFERABLE_FIELDS } from '../../../constants/fieldInference';
import EditorPreviewContent from './EditorPreviewContent.js';
import PreviewHOC from './PreviewHOC';
import EditorPreview from './EditorPreview';
import { jsx as ___EmotionJSX } from "@emotion/react";
const PreviewPaneFrame = /*#__PURE__*/_styled(Frame, {
  target: "enus48h0",
  label: "PreviewPaneFrame"
})("width:100%;height:100%;border:none;background:#fff;border-radius:", lengths.borderRadius, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQnNDIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0VkaXRvci9FZGl0b3JQcmV2aWV3UGFuZS9FZGl0b3JQcmV2aWV3UGFuZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgTGlzdCwgTWFwIH0gZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBJbW11dGFibGVQcm9wVHlwZXMgZnJvbSAncmVhY3QtaW1tdXRhYmxlLXByb3B0eXBlcyc7XG5pbXBvcnQgRnJhbWUsIHsgRnJhbWVDb250ZXh0Q29uc3VtZXIgfSBmcm9tICdyZWFjdC1mcmFtZS1jb21wb25lbnQnO1xuaW1wb3J0IHsgbGVuZ3RocyB9IGZyb20gJ2RlY2FwLWNtcy11aS1kZWZhdWx0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IGVuY29kZUVudHJ5IH0gZnJvbSAnLi4vLi4vLi4vbGliL3N0ZWdhJztcbmltcG9ydCB7XG4gIHJlc29sdmVXaWRnZXQsXG4gIGdldFByZXZpZXdUZW1wbGF0ZSxcbiAgZ2V0UHJldmlld1N0eWxlcyxcbiAgZ2V0UmVtYXJrUGx1Z2lucyxcbiAgZ2V0RWRpdG9yQ29tcG9uZW50cyxcbn0gZnJvbSAnLi4vLi4vLi4vbGliL3JlZ2lzdHJ5JztcbmltcG9ydCB7IGdldEFsbEVudHJpZXMsIHRyeUxvYWRFbnRyeSB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvZW50cmllcyc7XG5pbXBvcnQgeyBFcnJvckJvdW5kYXJ5IH0gZnJvbSAnLi4vLi4vVUknO1xuaW1wb3J0IHtcbiAgc2VsZWN0VGVtcGxhdGVOYW1lLFxuICBzZWxlY3RJbmZlcnJlZEZpZWxkLFxuICBzZWxlY3RGaWVsZCxcbn0gZnJvbSAnLi4vLi4vLi4vcmVkdWNlcnMvY29sbGVjdGlvbnMnO1xuaW1wb3J0IHsgYm91bmRHZXRBc3NldCB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvbWVkaWEnO1xuaW1wb3J0IHsgc2VsZWN0SXNMb2FkaW5nQXNzZXQgfSBmcm9tICcuLi8uLi8uLi9yZWR1Y2Vycy9tZWRpYXMnO1xuaW1wb3J0IHsgSU5GRVJBQkxFX0ZJRUxEUyB9IGZyb20gJy4uLy4uLy4uL2NvbnN0YW50cy9maWVsZEluZmVyZW5jZSc7XG5pbXBvcnQgRWRpdG9yUHJldmlld0NvbnRlbnQgZnJvbSAnLi9FZGl0b3JQcmV2aWV3Q29udGVudC5qcyc7XG5pbXBvcnQgUHJldmlld0hPQyBmcm9tICcuL1ByZXZpZXdIT0MnO1xuaW1wb3J0IEVkaXRvclByZXZpZXcgZnJvbSAnLi9FZGl0b3JQcmV2aWV3JztcblxuY29uc3QgUHJldmlld1BhbmVGcmFtZSA9IHN0eWxlZChGcmFtZSlgXG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgYm9yZGVyLXJhZGl1czogJHtsZW5ndGhzLmJvcmRlclJhZGl1c307XG5gO1xuXG5leHBvcnQgY2xhc3MgUHJldmlld1BhbmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBnZXRXaWRnZXQgPSAoZmllbGQsIHZhbHVlLCBtZXRhZGF0YSwgcHJvcHMsIGlkeCA9IG51bGwpID0+IHtcbiAgICBjb25zdCB7IGdldEFzc2V0LCBlbnRyeSB9ID0gcHJvcHM7XG4gICAgY29uc3Qgd2lkZ2V0ID0gcmVzb2x2ZVdpZGdldChmaWVsZC5nZXQoJ3dpZGdldCcpKTtcbiAgICBjb25zdCBrZXkgPSBpZHggPyBmaWVsZC5nZXQoJ25hbWUnKSArICdfJyArIGlkeCA6IGZpZWxkLmdldCgnbmFtZScpO1xuICAgIGNvbnN0IHZhbHVlSXNJbk1hcCA9IHZhbHVlICYmICF3aWRnZXQuYWxsb3dNYXBWYWx1ZSAmJiBNYXAuaXNNYXAodmFsdWUpO1xuXG4gICAgLyoqXG4gICAgICogVXNlIGFuIEhPQyB0byBwcm92aWRlIGNvbmRpdGlvbmFsIHVwZGF0ZXMgZm9yIGFsbCBwcmV2aWV3cy5cbiAgICAgKi9cbiAgICByZXR1cm4gIXdpZGdldC5wcmV2aWV3ID8gbnVsbCA6IChcbiAgICAgIDxQcmV2aWV3SE9DXG4gICAgICAgIHByZXZpZXdDb21wb25lbnQ9e3dpZGdldC5wcmV2aWV3fVxuICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgZmllbGQ9e2ZpZWxkfVxuICAgICAgICBnZXRBc3NldD17Z2V0QXNzZXR9XG4gICAgICAgIHZhbHVlPXt2YWx1ZUlzSW5NYXAgPyB2YWx1ZS5nZXQoZmllbGQuZ2V0KCduYW1lJykpIDogdmFsdWV9XG4gICAgICAgIGVudHJ5PXtlbnRyeX1cbiAgICAgICAgZmllbGRzTWV0YURhdGE9e21ldGFkYXRhfVxuICAgICAgICByZXNvbHZlV2lkZ2V0PXtyZXNvbHZlV2lkZ2V0fVxuICAgICAgICBnZXRSZW1hcmtQbHVnaW5zPXtnZXRSZW1hcmtQbHVnaW5zfVxuICAgICAgICBnZXRFZGl0b3JDb21wb25lbnRzPXtnZXRFZGl0b3JDb21wb25lbnRzfVxuICAgICAgLz5cbiAgICApO1xuICB9O1xuXG4gIGluZmVycmVkRmllbGRzID0ge307XG5cbiAgaW5mZXJGaWVsZHMoKSB7XG4gICAgY29uc3QgdGl0bGVGaWVsZCA9IHNlbGVjdEluZmVycmVkRmllbGQodGhpcy5wcm9wcy5jb2xsZWN0aW9uLCAndGl0bGUnKTtcbiAgICBjb25zdCBzaG9ydFRpdGxlRmllbGQgPSBzZWxlY3RJbmZlcnJlZEZpZWxkKHRoaXMucHJvcHMuY29sbGVjdGlvbiwgJ3Nob3J0VGl0bGUnKTtcbiAgICBjb25zdCBhdXRob3JGaWVsZCA9IHNlbGVjdEluZmVycmVkRmllbGQodGhpcy5wcm9wcy5jb2xsZWN0aW9uLCAnYXV0aG9yJyk7XG5cbiAgICB0aGlzLmluZmVycmVkRmllbGRzID0ge307XG4gICAgaWYgKHRpdGxlRmllbGQpIHRoaXMuaW5mZXJyZWRGaWVsZHNbdGl0bGVGaWVsZF0gPSBJTkZFUkFCTEVfRklFTERTLnRpdGxlO1xuICAgIGlmIChzaG9ydFRpdGxlRmllbGQpIHRoaXMuaW5mZXJyZWRGaWVsZHNbc2hvcnRUaXRsZUZpZWxkXSA9IElORkVSQUJMRV9GSUVMRFMuc2hvcnRUaXRsZTtcbiAgICBpZiAoYXV0aG9yRmllbGQpIHRoaXMuaW5mZXJyZWRGaWVsZHNbYXV0aG9yRmllbGRdID0gSU5GRVJBQkxFX0ZJRUxEUy5hdXRob3I7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgd2lkZ2V0IGNvbXBvbmVudCBmb3IgYSBuYW1lZCBmaWVsZCwgYW5kIG1ha2VzIHJlY3Vyc2l2ZSBjYWxsc1xuICAgKiB0byByZXRyaWV2ZSBjb21wb25lbnRzIGZvciBuZXN0ZWQgYW5kIGRlZXBseSBuZXN0ZWQgZmllbGRzLCB3aGljaCBvY2N1ciBpblxuICAgKiBvYmplY3QgYW5kIGxpc3QgdHlwZSBmaWVsZHMuIFVzZWQgaW50ZXJuYWxseSB0byByZXRyaWV2ZSB3aWRnZXRzLCBhbmQgYWxzb1xuICAgKiBleHBvc2VkIGZvciB1c2UgaW4gY3VzdG9tIHByZXZpZXcgdGVtcGxhdGVzLlxuICAgKi9cbiAgd2lkZ2V0Rm9yID0gKFxuICAgIG5hbWUsXG4gICAgZmllbGRzID0gdGhpcy5wcm9wcy5maWVsZHMsXG4gICAgdmFsdWVzID0gdGhpcy5wcm9wcy5lbnRyeS5nZXQoJ2RhdGEnKSxcbiAgICBmaWVsZHNNZXRhRGF0YSA9IHRoaXMucHJvcHMuZmllbGRzTWV0YURhdGEsXG4gICkgPT4ge1xuICAgIC8vIFdlIHJldHJpZXZlIHRoZSBmaWVsZCBieSBuYW1lIHNvIHRoYXQgdGhpcyBmdW5jdGlvbiBjYW4gYWxzbyBiZSB1c2VkIGluXG4gICAgLy8gY3VzdG9tIHByZXZpZXcgdGVtcGxhdGVzLCB3aGVyZSB0aGUgZmllbGQgb2JqZWN0IGNhbid0IGJlIHBhc3NlZCBpbi5cbiAgICBsZXQgZmllbGQgPSBmaWVsZHMgJiYgZmllbGRzLmZpbmQoZiA9PiBmLmdldCgnbmFtZScpID09PSBuYW1lKTtcbiAgICBsZXQgdmFsdWUgPSBNYXAuaXNNYXAodmFsdWVzKSAmJiB2YWx1ZXMuZ2V0KGZpZWxkLmdldCgnbmFtZScpKTtcbiAgICBpZiAoZmllbGQuZ2V0KCdtZXRhJykpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5wcm9wcy5lbnRyeS5nZXRJbihbJ21ldGEnLCBmaWVsZC5nZXQoJ25hbWUnKV0pO1xuICAgIH1cblxuICAgIGNvbnN0IG5lc3RlZEZpZWxkcyA9IGZpZWxkLmdldCgnZmllbGRzJyk7XG4gICAgY29uc3Qgc2luZ2xlRmllbGQgPSBmaWVsZC5nZXQoJ2ZpZWxkJyk7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBmaWVsZHNNZXRhRGF0YSAmJiBmaWVsZHNNZXRhRGF0YS5nZXQoZmllbGQuZ2V0KCduYW1lJyksIE1hcCgpKTtcblxuICAgIGlmIChuZXN0ZWRGaWVsZHMpIHtcbiAgICAgIGZpZWxkID0gZmllbGQuc2V0KCdmaWVsZHMnLCB0aGlzLmdldE5lc3RlZFdpZGdldHMobmVzdGVkRmllbGRzLCB2YWx1ZSwgbWV0YWRhdGEpKTtcbiAgICB9XG5cbiAgICBpZiAoc2luZ2xlRmllbGQpIHtcbiAgICAgIGZpZWxkID0gZmllbGQuc2V0KCdmaWVsZCcsIHRoaXMuZ2V0U2luZ2xlTmVzdGVkKHNpbmdsZUZpZWxkLCB2YWx1ZSwgbWV0YWRhdGEpKTtcbiAgICB9XG5cbiAgICBjb25zdCBsYWJlbGxlZFdpZGdldHMgPSBbJ3N0cmluZycsICd0ZXh0JywgJ251bWJlciddO1xuICAgIGNvbnN0IGluZmVycmVkRmllbGQgPSBPYmplY3QuZW50cmllcyh0aGlzLmluZmVycmVkRmllbGRzKVxuICAgICAgLmZpbHRlcigoW2tleV0pID0+IHtcbiAgICAgICAgY29uc3QgZmllbGRUb01hdGNoID0gc2VsZWN0RmllbGQodGhpcy5wcm9wcy5jb2xsZWN0aW9uLCBrZXkpO1xuICAgICAgICByZXR1cm4gZmllbGRUb01hdGNoID09PSBmaWVsZDtcbiAgICAgIH0pXG4gICAgICAubWFwKChbLCB2YWx1ZV0pID0+IHZhbHVlKVswXTtcblxuICAgIGlmIChpbmZlcnJlZEZpZWxkKSB7XG4gICAgICB2YWx1ZSA9IGluZmVycmVkRmllbGQuZGVmYXVsdFByZXZpZXcodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICB2YWx1ZSAmJlxuICAgICAgbGFiZWxsZWRXaWRnZXRzLmluZGV4T2YoZmllbGQuZ2V0KCd3aWRnZXQnKSkgIT09IC0xICYmXG4gICAgICB2YWx1ZS50b1N0cmluZygpLmxlbmd0aCA8IDUwXG4gICAgKSB7XG4gICAgICB2YWx1ZSA9IChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8c3Ryb25nPntmaWVsZC5nZXQoJ2xhYmVsJywgZmllbGQuZ2V0KCduYW1lJykpfTo8L3N0cm9uZz4ge3ZhbHVlfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlID8gdGhpcy5nZXRXaWRnZXQoZmllbGQsIHZhbHVlLCBtZXRhZGF0YSwgdGhpcy5wcm9wcykgOiBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgd2lkZ2V0cyBmb3IgbmVzdGVkIGZpZWxkcyAoY2hpbGRyZW4gb2Ygb2JqZWN0L2xpc3QgZmllbGRzKVxuICAgKi9cbiAgZ2V0TmVzdGVkV2lkZ2V0cyA9IChmaWVsZHMsIHZhbHVlcywgZmllbGRzTWV0YURhdGEpID0+IHtcbiAgICAvLyBGaWVsZHMgbmVzdGVkIHdpdGhpbiBhIGxpc3QgZmllbGQgd2lsbCBiZSBwYWlyZWQgd2l0aCBhIExpc3Qgb2YgdmFsdWUgTWFwcy5cbiAgICBpZiAoTGlzdC5pc0xpc3QodmFsdWVzKSkge1xuICAgICAgcmV0dXJuIHZhbHVlcy5tYXAodmFsdWUgPT4gdGhpcy53aWRnZXRzRm9yTmVzdGVkRmllbGRzKGZpZWxkcywgdmFsdWUsIGZpZWxkc01ldGFEYXRhKSk7XG4gICAgfVxuICAgIC8vIEZpZWxkcyBuZXN0ZWQgd2l0aGluIGFuIG9iamVjdCBmaWVsZCB3aWxsIGJlIHBhaXJlZCB3aXRoIGEgc2luZ2xlIE1hcCBvZiB2YWx1ZXMuXG4gICAgcmV0dXJuIHRoaXMud2lkZ2V0c0Zvck5lc3RlZEZpZWxkcyhmaWVsZHMsIHZhbHVlcywgZmllbGRzTWV0YURhdGEpO1xuICB9O1xuXG4gIGdldFNpbmdsZU5lc3RlZCA9IChmaWVsZCwgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSkgPT4ge1xuICAgIGlmIChMaXN0LmlzTGlzdCh2YWx1ZXMpKSB7XG4gICAgICByZXR1cm4gdmFsdWVzLm1hcCgodmFsdWUsIGlkeCkgPT5cbiAgICAgICAgdGhpcy5nZXRXaWRnZXQoZmllbGQsIHZhbHVlLCBmaWVsZHNNZXRhRGF0YS5nZXQoZmllbGQuZ2V0KCduYW1lJykpLCB0aGlzLnByb3BzLCBpZHgpLFxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2V0V2lkZ2V0KGZpZWxkLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhLmdldChmaWVsZC5nZXQoJ25hbWUnKSksIHRoaXMucHJvcHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBVc2Ugd2lkZ2V0Rm9yIGFzIGEgbWFwcGluZyBmdW5jdGlvbiBmb3IgcmVjdXJzaXZlIHdpZGdldCByZXRyaWV2YWxcbiAgICovXG4gIHdpZGdldHNGb3JOZXN0ZWRGaWVsZHMgPSAoZmllbGRzLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhKSA9PiB7XG4gICAgcmV0dXJuIGZpZWxkcy5tYXAoZmllbGQgPT4gdGhpcy53aWRnZXRGb3IoZmllbGQuZ2V0KCduYW1lJyksIGZpZWxkcywgdmFsdWVzLCBmaWVsZHNNZXRhRGF0YSkpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGV4aXN0cyBlbnRpcmVseSB0byBleHBvc2UgbmVzdGVkIHdpZGdldHMgZm9yIG9iamVjdCBhbmQgbGlzdFxuICAgKiBmaWVsZHMgdG8gY3VzdG9tIHByZXZpZXcgdGVtcGxhdGVzLlxuICAgKlxuICAgKiBUT0RPOiBzZWUgaWYgd2lkZ2V0Rm9yIGNhbiBub3cgcHJvdmlkZSB0aGlzIGZ1bmN0aW9uYWxpdHkgZm9yIHByZXZpZXcgdGVtcGxhdGVzXG4gICAqL1xuICB3aWRnZXRzRm9yID0gbmFtZSA9PiB7XG4gICAgY29uc3QgeyBmaWVsZHMsIGVudHJ5LCBmaWVsZHNNZXRhRGF0YSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBmaWVsZCA9IGZpZWxkcy5maW5kKGYgPT4gZi5nZXQoJ25hbWUnKSA9PT0gbmFtZSk7XG4gICAgY29uc3QgbmVzdGVkRmllbGRzID0gZmllbGQgJiYgZmllbGQuZ2V0KCdmaWVsZHMnKTtcbiAgICBjb25zdCB2YXJpYWJsZVR5cGVzID0gZmllbGQgJiYgZmllbGQuZ2V0KCd0eXBlcycpO1xuICAgIGNvbnN0IHZhbHVlID0gZW50cnkuZ2V0SW4oWydkYXRhJywgZmllbGQuZ2V0KCduYW1lJyldKTtcbiAgICBjb25zdCBtZXRhZGF0YSA9IGZpZWxkc01ldGFEYXRhLmdldChmaWVsZC5nZXQoJ25hbWUnKSwgTWFwKCkpO1xuXG4gICAgLy8gVmFyaWFibGUgVHlwZSBsaXN0c1xuICAgIGlmIChMaXN0LmlzTGlzdCh2YWx1ZSkgJiYgdmFyaWFibGVUeXBlcykge1xuICAgICAgcmV0dXJuIHZhbHVlLm1hcCh2YWwgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZVR5cGUgPSB2YXJpYWJsZVR5cGVzLmZpbmQodCA9PiB0LmdldCgnbmFtZScpID09PSB2YWwuZ2V0KCd0eXBlJykpO1xuICAgICAgICBjb25zdCB0eXBlRmllbGRzID0gdmFsdWVUeXBlICYmIHZhbHVlVHlwZS5nZXQoJ2ZpZWxkcycpO1xuICAgICAgICBjb25zdCB3aWRnZXRzID1cbiAgICAgICAgICB0eXBlRmllbGRzICYmXG4gICAgICAgICAgTWFwKFxuICAgICAgICAgICAgdHlwZUZpZWxkcy5tYXAoKGYsIGkpID0+IFtcbiAgICAgICAgICAgICAgZi5nZXQoJ25hbWUnKSxcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9Pnt0aGlzLmdldFdpZGdldChmLCB2YWwsIG1ldGFkYXRhLmdldChmLmdldCgnbmFtZScpKSwgdGhpcy5wcm9wcyl9PC9kaXY+LFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIE1hcCh7IGRhdGE6IHZhbCwgd2lkZ2V0cyB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIExpc3Qgd2lkZ2V0c1xuICAgIGlmIChMaXN0LmlzTGlzdCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5tYXAodmFsID0+IHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0cyA9XG4gICAgICAgICAgbmVzdGVkRmllbGRzICYmXG4gICAgICAgICAgTWFwKFxuICAgICAgICAgICAgbmVzdGVkRmllbGRzLm1hcCgoZiwgaSkgPT4gW1xuICAgICAgICAgICAgICBmLmdldCgnbmFtZScpLFxuICAgICAgICAgICAgICA8ZGl2IGtleT17aX0+e3RoaXMuZ2V0V2lkZ2V0KGYsIHZhbCwgbWV0YWRhdGEuZ2V0KGYuZ2V0KCduYW1lJykpLCB0aGlzLnByb3BzKX08L2Rpdj4sXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICApO1xuICAgICAgICByZXR1cm4gTWFwKHsgZGF0YTogdmFsLCB3aWRnZXRzIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIE1hcCh7XG4gICAgICBkYXRhOiB2YWx1ZSxcbiAgICAgIHdpZGdldHM6XG4gICAgICAgIG5lc3RlZEZpZWxkcyAmJlxuICAgICAgICBNYXAoXG4gICAgICAgICAgbmVzdGVkRmllbGRzLm1hcChmID0+IFtcbiAgICAgICAgICAgIGYuZ2V0KCduYW1lJyksXG4gICAgICAgICAgICB0aGlzLmdldFdpZGdldChmLCB2YWx1ZSwgbWV0YWRhdGEuZ2V0KGYuZ2V0KCduYW1lJykpLCB0aGlzLnByb3BzKSxcbiAgICAgICAgICBdKSxcbiAgICAgICAgKSxcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVGhpcyBmdW5jdGlvbiBleGlzdHMgZW50aXJlbHkgdG8gZXhwb3NlIGNvbGxlY3Rpb25zIGZyb20gb3V0c2lkZSBvZiB0aGlzIGVudHJ5XG4gICAqXG4gICAqL1xuICBnZXRDb2xsZWN0aW9uID0gYXN5bmMgKGNvbGxlY3Rpb25OYW1lLCBzbHVnKSA9PiB7XG4gICAgY29uc3QgeyBzdGF0ZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBzZWxlY3RlZENvbGxlY3Rpb24gPSBzdGF0ZS5jb2xsZWN0aW9ucy5nZXQoY29sbGVjdGlvbk5hbWUpO1xuXG4gICAgaWYgKHR5cGVvZiBzbHVnID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgZW50cmllcyA9IGF3YWl0IGdldEFsbEVudHJpZXMoc3RhdGUsIHNlbGVjdGVkQ29sbGVjdGlvbik7XG4gICAgICByZXR1cm4gZW50cmllcy5tYXAoZW50cnkgPT4gTWFwKCkuc2V0KCdkYXRhJywgZW50cnkuZGF0YSkpO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJ5ID0gYXdhaXQgdHJ5TG9hZEVudHJ5KHN0YXRlLCBzZWxlY3RlZENvbGxlY3Rpb24sIHNsdWcpO1xuICAgIHJldHVybiBNYXAoKS5zZXQoJ2RhdGEnLCBlbnRyeS5kYXRhKTtcbiAgfTtcblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBlbnRyeSwgY29sbGVjdGlvbiwgY29uZmlnIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50cnkuZ2V0KCdkYXRhJykpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHByZXZpZXdDb21wb25lbnQgPVxuICAgICAgZ2V0UHJldmlld1RlbXBsYXRlKHNlbGVjdFRlbXBsYXRlTmFtZShjb2xsZWN0aW9uLCBlbnRyeS5nZXQoJ3NsdWcnKSkpIHx8IEVkaXRvclByZXZpZXc7XG5cbiAgICB0aGlzLmluZmVyRmllbGRzKCk7XG5cbiAgICBjb25zdCB2aXN1YWxFZGl0aW5nID0gY29sbGVjdGlvbi5nZXRJbihbJ2VkaXRvcicsICd2aXN1YWxFZGl0aW5nJ10sIGZhbHNlKTtcblxuICAgIC8vIE9ubHkgZW5jb2RlIGVudHJ5IGRhdGEgaWYgdmlzdWFsIGVkaXRpbmcgaXMgZW5hYmxlZFxuICAgIGNvbnN0IHByZXZpZXdFbnRyeSA9IHZpc3VhbEVkaXRpbmdcbiAgICAgID8gZW50cnkuc2V0KCdkYXRhJywgZW5jb2RlRW50cnkoZW50cnkuZ2V0KCdkYXRhJyksIHRoaXMucHJvcHMuZmllbGRzKSlcbiAgICAgIDogZW50cnk7XG5cbiAgICBjb25zdCBwcmV2aWV3UHJvcHMgPSB7XG4gICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgZW50cnk6IHByZXZpZXdFbnRyeSxcbiAgICAgIHdpZGdldEZvcjogKG5hbWUsIGZpZWxkcywgdmFsdWVzID0gcHJldmlld0VudHJ5LmdldCgnZGF0YScpLCBmaWVsZHNNZXRhRGF0YSkgPT5cbiAgICAgICAgdGhpcy53aWRnZXRGb3IobmFtZSwgZmllbGRzLCB2YWx1ZXMsIGZpZWxkc01ldGFEYXRhKSxcbiAgICAgIHdpZGdldHNGb3I6IHRoaXMud2lkZ2V0c0ZvcixcbiAgICAgIGdldENvbGxlY3Rpb246IHRoaXMuZ2V0Q29sbGVjdGlvbixcbiAgICAgIGdldEVkaXRvckNvbXBvbmVudHMsXG4gICAgfTtcblxuICAgIGNvbnN0IHN0eWxlRWxzID0gZ2V0UHJldmlld1N0eWxlcygpLm1hcCgoc3R5bGUsIGkpID0+IHtcbiAgICAgIGlmIChzdHlsZS5yYXcpIHtcbiAgICAgICAgcmV0dXJuIDxzdHlsZSBrZXk9e2l9PntzdHlsZS52YWx1ZX08L3N0eWxlPjtcbiAgICAgIH1cbiAgICAgIHJldHVybiA8bGluayBrZXk9e2l9IGhyZWY9e3N0eWxlLnZhbHVlfSB0eXBlPVwidGV4dC9jc3NcIiByZWw9XCJzdHlsZXNoZWV0XCIgLz47XG4gICAgfSk7XG5cbiAgICBpZiAoIWNvbGxlY3Rpb24pIHtcbiAgICAgIDxQcmV2aWV3UGFuZUZyYW1lIGlkPVwicHJldmlldy1wYW5lXCIgaGVhZD17c3R5bGVFbHN9IC8+O1xuICAgIH1cblxuICAgIGNvbnN0IGluaXRpYWxDb250ZW50ID0gYFxuPCFET0NUWVBFIGh0bWw+XG48aHRtbD5cbiAgPGhlYWQ+PGJhc2UgdGFyZ2V0PVwiX2JsYW5rXCIvPjwvaGVhZD5cbiAgPGJvZHk+PGRpdj48L2Rpdj48L2JvZHk+XG48L2h0bWw+XG5gO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxFcnJvckJvdW5kYXJ5IGNvbmZpZz17Y29uZmlnfT5cbiAgICAgICAgPFByZXZpZXdQYW5lRnJhbWUgaWQ9XCJwcmV2aWV3LXBhbmVcIiBoZWFkPXtzdHlsZUVsc30gaW5pdGlhbENvbnRlbnQ9e2luaXRpYWxDb250ZW50fT5cbiAgICAgICAgICA8RnJhbWVDb250ZXh0Q29uc3VtZXI+XG4gICAgICAgICAgICB7KHsgZG9jdW1lbnQsIHdpbmRvdyB9KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEVkaXRvclByZXZpZXdDb250ZW50XG4gICAgICAgICAgICAgICAgICB7Li4ueyBwcmV2aWV3Q29tcG9uZW50LCBwcmV2aWV3UHJvcHM6IHsgLi4ucHJldmlld1Byb3BzLCBkb2N1bWVudCwgd2luZG93IH0gfX1cbiAgICAgICAgICAgICAgICAgIG9uRmllbGRDbGljaz17dGhpcy5wcm9wcy5vbkZpZWxkQ2xpY2t9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPC9GcmFtZUNvbnRleHRDb25zdW1lcj5cbiAgICAgICAgPC9QcmV2aWV3UGFuZUZyYW1lPlxuICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICk7XG4gIH1cbn1cblxuUHJldmlld1BhbmUucHJvcFR5cGVzID0ge1xuICBjb2xsZWN0aW9uOiBJbW11dGFibGVQcm9wVHlwZXMubWFwLmlzUmVxdWlyZWQsXG4gIGZpZWxkczogSW1tdXRhYmxlUHJvcFR5cGVzLmxpc3QuaXNSZXF1aXJlZCxcbiAgZW50cnk6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgZmllbGRzTWV0YURhdGE6IEltbXV0YWJsZVByb3BUeXBlcy5tYXAuaXNSZXF1aXJlZCxcbiAgZ2V0QXNzZXQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIG9uRmllbGRDbGljazogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG5mdW5jdGlvbiBtYXBTdGF0ZVRvUHJvcHMoc3RhdGUpIHtcbiAgY29uc3QgaXNMb2FkaW5nQXNzZXQgPSBzZWxlY3RJc0xvYWRpbmdBc3NldChzdGF0ZS5tZWRpYXMpO1xuICByZXR1cm4geyBpc0xvYWRpbmdBc3NldCwgY29uZmlnOiBzdGF0ZS5jb25maWcsIHN0YXRlIH07XG59XG5cbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xuICByZXR1cm4ge1xuICAgIGJvdW5kR2V0QXNzZXQ6IChjb2xsZWN0aW9uLCBlbnRyeSkgPT4gYm91bmRHZXRBc3NldChkaXNwYXRjaCwgY29sbGVjdGlvbiwgZW50cnkpLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtZXJnZVByb3BzKHN0YXRlUHJvcHMsIGRpc3BhdGNoUHJvcHMsIG93blByb3BzKSB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGVQcm9wcyxcbiAgICAuLi5kaXNwYXRjaFByb3BzLFxuICAgIC4uLm93blByb3BzLFxuICAgIGdldEFzc2V0OiBkaXNwYXRjaFByb3BzLmJvdW5kR2V0QXNzZXQob3duUHJvcHMuY29sbGVjdGlvbiwgb3duUHJvcHMuZW50cnkpLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzLCBtZXJnZVByb3BzKShQcmV2aWV3UGFuZSk7XG4iXX0= */"));
export class PreviewPane extends React.Component {
  getWidget = (field, value, metadata, props, idx = null) => {
    const {
      getAsset,
      entry
    } = props;
    const widget = resolveWidget(field.get('widget'));
    const key = idx ? field.get('name') + '_' + idx : field.get('name');
    const valueIsInMap = value && !widget.allowMapValue && Map.isMap(value);

    /**
     * Use an HOC to provide conditional updates for all previews.
     */
    return !widget.preview ? null : ___EmotionJSX(PreviewHOC, {
      previewComponent: widget.preview,
      key: key,
      field: field,
      getAsset: getAsset,
      value: valueIsInMap ? value.get(field.get('name')) : value,
      entry: entry,
      fieldsMetaData: metadata,
      resolveWidget: resolveWidget,
      getRemarkPlugins: getRemarkPlugins,
      getEditorComponents: getEditorComponents
    });
  };
  inferredFields = {};
  inferFields() {
    const titleField = selectInferredField(this.props.collection, 'title');
    const shortTitleField = selectInferredField(this.props.collection, 'shortTitle');
    const authorField = selectInferredField(this.props.collection, 'author');
    this.inferredFields = {};
    if (titleField) this.inferredFields[titleField] = INFERABLE_FIELDS.title;
    if (shortTitleField) this.inferredFields[shortTitleField] = INFERABLE_FIELDS.shortTitle;
    if (authorField) this.inferredFields[authorField] = INFERABLE_FIELDS.author;
  }

  /**
   * Returns the widget component for a named field, and makes recursive calls
   * to retrieve components for nested and deeply nested fields, which occur in
   * object and list type fields. Used internally to retrieve widgets, and also
   * exposed for use in custom preview templates.
   */
  widgetFor = (name, fields = this.props.fields, values = this.props.entry.get('data'), fieldsMetaData = this.props.fieldsMetaData) => {
    // We retrieve the field by name so that this function can also be used in
    // custom preview templates, where the field object can't be passed in.
    let field = fields && fields.find(f => f.get('name') === name);
    let value = Map.isMap(values) && values.get(field.get('name'));
    if (field.get('meta')) {
      value = this.props.entry.getIn(['meta', field.get('name')]);
    }
    const nestedFields = field.get('fields');
    const singleField = field.get('field');
    const metadata = fieldsMetaData && fieldsMetaData.get(field.get('name'), Map());
    if (nestedFields) {
      field = field.set('fields', this.getNestedWidgets(nestedFields, value, metadata));
    }
    if (singleField) {
      field = field.set('field', this.getSingleNested(singleField, value, metadata));
    }
    const labelledWidgets = ['string', 'text', 'number'];
    const inferredField = Object.entries(this.inferredFields).filter(([key]) => {
      const fieldToMatch = selectField(this.props.collection, key);
      return fieldToMatch === field;
    }).map(([, value]) => value)[0];
    if (inferredField) {
      value = inferredField.defaultPreview(value);
    } else if (value && labelledWidgets.indexOf(field.get('widget')) !== -1 && value.toString().length < 50) {
      value = ___EmotionJSX("div", null, ___EmotionJSX("strong", null, field.get('label', field.get('name')), ":"), " ", value);
    }
    return value ? this.getWidget(field, value, metadata, this.props) : null;
  };

  /**
   * Retrieves widgets for nested fields (children of object/list fields)
   */
  getNestedWidgets = (fields, values, fieldsMetaData) => {
    // Fields nested within a list field will be paired with a List of value Maps.
    if (List.isList(values)) {
      return values.map(value => this.widgetsForNestedFields(fields, value, fieldsMetaData));
    }
    // Fields nested within an object field will be paired with a single Map of values.
    return this.widgetsForNestedFields(fields, values, fieldsMetaData);
  };
  getSingleNested = (field, values, fieldsMetaData) => {
    if (List.isList(values)) {
      return values.map((value, idx) => this.getWidget(field, value, fieldsMetaData.get(field.get('name')), this.props, idx));
    }
    return this.getWidget(field, values, fieldsMetaData.get(field.get('name')), this.props);
  };

  /**
   * Use widgetFor as a mapping function for recursive widget retrieval
   */
  widgetsForNestedFields = (fields, values, fieldsMetaData) => {
    return fields.map(field => this.widgetFor(field.get('name'), fields, values, fieldsMetaData));
  };

  /**
   * This function exists entirely to expose nested widgets for object and list
   * fields to custom preview templates.
   *
   * TODO: see if widgetFor can now provide this functionality for preview templates
   */
  widgetsFor = name => {
    const {
      fields,
      entry,
      fieldsMetaData
    } = this.props;
    const field = fields.find(f => f.get('name') === name);
    const nestedFields = field && field.get('fields');
    const variableTypes = field && field.get('types');
    const value = entry.getIn(['data', field.get('name')]);
    const metadata = fieldsMetaData.get(field.get('name'), Map());

    // Variable Type lists
    if (List.isList(value) && variableTypes) {
      return value.map(val => {
        const valueType = variableTypes.find(t => t.get('name') === val.get('type'));
        const typeFields = valueType && valueType.get('fields');
        const widgets = typeFields && Map(typeFields.map((f, i) => [f.get('name'), ___EmotionJSX("div", {
          key: i
        }, this.getWidget(f, val, metadata.get(f.get('name')), this.props))]));
        return Map({
          data: val,
          widgets
        });
      });
    }

    // List widgets
    if (List.isList(value)) {
      return value.map(val => {
        const widgets = nestedFields && Map(nestedFields.map((f, i) => [f.get('name'), ___EmotionJSX("div", {
          key: i
        }, this.getWidget(f, val, metadata.get(f.get('name')), this.props))]));
        return Map({
          data: val,
          widgets
        });
      });
    }
    return Map({
      data: value,
      widgets: nestedFields && Map(nestedFields.map(f => [f.get('name'), this.getWidget(f, value, metadata.get(f.get('name')), this.props)]))
    });
  };

  /**
   * This function exists entirely to expose collections from outside of this entry
   *
   */
  getCollection = async (collectionName, slug) => {
    const {
      state
    } = this.props;
    const selectedCollection = state.collections.get(collectionName);
    if (typeof slug === 'undefined') {
      const entries = await getAllEntries(state, selectedCollection);
      return entries.map(entry => Map().set('data', entry.data));
    }
    const entry = await tryLoadEntry(state, selectedCollection, slug);
    return Map().set('data', entry.data);
  };
  render() {
    const {
      entry,
      collection,
      config
    } = this.props;
    if (!entry || !entry.get('data')) {
      return null;
    }
    const previewComponent = getPreviewTemplate(selectTemplateName(collection, entry.get('slug'))) || EditorPreview;
    this.inferFields();
    const visualEditing = collection.getIn(['editor', 'visualEditing'], false);

    // Only encode entry data if visual editing is enabled
    const previewEntry = visualEditing ? entry.set('data', encodeEntry(entry.get('data'), this.props.fields)) : entry;
    const previewProps = {
      ...this.props,
      entry: previewEntry,
      widgetFor: (name, fields, values = previewEntry.get('data'), fieldsMetaData) => this.widgetFor(name, fields, values, fieldsMetaData),
      widgetsFor: this.widgetsFor,
      getCollection: this.getCollection,
      getEditorComponents
    };
    const styleEls = getPreviewStyles().map((style, i) => {
      if (style.raw) {
        return ___EmotionJSX("style", {
          key: i
        }, style.value);
      }
      return ___EmotionJSX("link", {
        key: i,
        href: style.value,
        type: "text/css",
        rel: "stylesheet"
      });
    });
    if (!collection) {
      ___EmotionJSX(PreviewPaneFrame, {
        id: "preview-pane",
        head: styleEls
      });
    }
    const initialContent = `
<!DOCTYPE html>
<html>
  <head><base target="_blank"/></head>
  <body><div></div></body>
</html>
`;
    return ___EmotionJSX(ErrorBoundary, {
      config: config
    }, ___EmotionJSX(PreviewPaneFrame, {
      id: "preview-pane",
      head: styleEls,
      initialContent: initialContent
    }, ___EmotionJSX(FrameContextConsumer, null, ({
      document,
      window
    }) => {
      return ___EmotionJSX(EditorPreviewContent, {
        previewComponent,
        previewProps: {
          ...previewProps,
          document,
          window
        },
        onFieldClick: this.props.onFieldClick
      });
    })));
  }
}
PreviewPane.propTypes = {
  collection: ImmutablePropTypes.map.isRequired,
  fields: ImmutablePropTypes.list.isRequired,
  entry: ImmutablePropTypes.map.isRequired,
  fieldsMetaData: ImmutablePropTypes.map.isRequired,
  getAsset: PropTypes.func.isRequired,
  onFieldClick: PropTypes.func
};
function mapStateToProps(state) {
  const isLoadingAsset = selectIsLoadingAsset(state.medias);
  return {
    isLoadingAsset,
    config: state.config,
    state
  };
}
function mapDispatchToProps(dispatch) {
  return {
    boundGetAsset: (collection, entry) => boundGetAsset(dispatch, collection, entry)
  };
}
function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    getAsset: dispatchProps.boundGetAsset(ownProps.collection, ownProps.entry)
  };
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PreviewPane);