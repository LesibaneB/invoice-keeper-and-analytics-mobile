import { Button, Container, Content, Text } from 'native-base';
import React from 'react';

interface Props {
  onRequestCameraPermissions: () => Promise<void>;
}

export function CameraFailureView({
  onRequestCameraPermissions,
}: Props): JSX.Element {
  return (
    <Container>
      <Content>
        <Text
          style={{
            alignSelf: 'center',
            marginTop: 300,
            justifyContent: 'center',
          }}>
          Camera permissions required.
        </Text>
        <Button
          onPress={onRequestCameraPermissions}
          transparent
          block
          style={{ marginTop: 10 }}>
          <Text style={{ color: '#78ed68' }}>Grant camera permissions</Text>
        </Button>
      </Content>
    </Container>
  );
}
