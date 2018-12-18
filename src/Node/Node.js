export function Node(element, attributes: Object, children: Array) {
  this.element = element;
  this.attributes = attributes || {};
  this.children = children || [];
}
