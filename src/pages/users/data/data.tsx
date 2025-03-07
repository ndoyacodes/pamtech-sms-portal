import {
  ArrowDownIcon,
  ArrowRightIcon,
  CheckCircledIcon,
  CrossCircledIcon,

} from '@radix-ui/react-icons'

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
]

export const statuses = [
  {
    value: 'ACTIVE',
    label: 'Active',
    icon: CheckCircledIcon,
  },
  {
    value: 'EXPIRED',
    label: 'Expired',
    icon: CrossCircledIcon,
  },
 
]

export const priorities = [
  {
    label: 'Pending',
    value: 'Pending',
    icon: ArrowRightIcon,
  },
  {
    label: 'Paid',
    value: 'Paid',
    icon: ArrowDownIcon,
  },
]
