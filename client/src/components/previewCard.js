import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import MediaPreview from './mediaPreview';
import CaptureText from './captureText';
/* eslint-disable */

export default ({ previewFiles, textChange }) => (
  <Card className="card" style={{marginBottom: 100 }}>
    {Object.keys(previewFiles)
      .map((file, index) => (
        <MediaPreview
          key={index}
          tag={file}
          source={previewFiles[file]}
        />
      ))
    }
    <CardText>
      <CaptureText
        change={textChange}
      />
    </CardText>
  </Card>
);
