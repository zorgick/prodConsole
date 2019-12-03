/**
 * Props define attributes on a virtual node.
 * @typedef {Object.<string, any> | {}} Props
 * @property {Children} Props.children
 */
/**
 * The vnode children of a virtual node.
 * @typedef {VNode[]} Children
 */
/**
 * Define a custom type for virtual nodes:
 * @typedef {string | number | Function} Type
 * @typedef {Object.<string, any>} VNode
 * @property {Type} VNode.type
 * @property {Props} VNode.props
 * @property {Children} VNode.children
 * @property {Key} [VNode.key]
 */
