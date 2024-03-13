import Avatar from './Avatar'
import Button from './Button'
import CardCustom from './CardCustom'
import Checkbox from './Checkbox'
import Container from './Container'
import Form from './FormControl'
import Input from './Input'
import Menu from './Menu'
import Modal from './Modal'
import Persona from './Persona'
import Popover from './Popover'
import Select from './Select'
import Textarea from './Textarea'
import Tooltip from './Tooltip'

export { default as Avatar } from './Avatar'
export { default as Container } from './Container'
export { default as Input } from './Input'
export { default as Textarea } from './Textarea'
export { default as Select } from './Select'
export { default as Checkbox } from './Checkbox'
export { default as Button } from './Button'
export { default as Tooltip } from './Tooltip'
export { default as CardCustom } from './CardCustom'
export { default as Modal } from './Modal'
export { default as Popover } from './Popover'
export { default as Menu } from './Menu'
export { default as Persona } from './Persona'
export { default as FormControl } from './FormControl'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const components: Record<string, any> = {
  Button,
  CardCustom,
  Checkbox,
  Container,
  Input,
  Select,
  Textarea,
  Tooltip,
  Modal,
  Popover,
  Menu,
  Persona,
  Avatar,
  Form,
}
