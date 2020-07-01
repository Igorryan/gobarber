import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 90 : 40}px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
  position: absolute;
  top: -10px;
  left: 20px;
  margin-bottom: 0;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 150px;
  height: 150px;
  border-radius: 98px;
  margin-top: 64px;
  align-self: center;
`;
