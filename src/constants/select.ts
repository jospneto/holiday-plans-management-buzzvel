import { generateFakeUser } from '../utils'

const LENGTH_SELECT = 10

export const select = Array.from({ length: LENGTH_SELECT }, generateFakeUser)
