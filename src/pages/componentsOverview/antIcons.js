// material-ui
import { styled } from '@mui/material/styles';

// project import
import ComponentSkeleton from './componentSkeleton';
import MainCard from 'components/mainCard';

// styles
const IFrameWrapper = styled('iframe')(() => ({
  height: 'calc(100vh - 210px)',
  border: 'none'
}));

// ============================|| ANT ICONS ||============================ //

const AntIcons = () => (
  <ComponentSkeleton>
    <MainCard title="Ant Icons">
      <IFrameWrapper title="Ant Icon" width="100%" src="https://ant.design/components/icon/" />
    </MainCard>
  </ComponentSkeleton>
);

export default AntIcons;
