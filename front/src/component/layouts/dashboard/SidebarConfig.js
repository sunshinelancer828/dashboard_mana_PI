import { Icon } from '@iconify/react';
import creditCardFill from '@iconify/icons-eva/credit-card-fill';
import cloudUploadFill from '@iconify/icons-eva/cloud-upload-fill';
import peopleFill from '@iconify/icons-eva/people-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Upload',
    path: '/dashboard/upload',
    icon: getIcon(cloudUploadFill)
  },
  {
    title: 'Device',
    path: '/dashboard/device',
    icon: getIcon(creditCardFill)
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  }
];

export default sidebarConfig;
