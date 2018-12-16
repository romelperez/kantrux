function buildDOM() {
  // TODO:
  return document.createElement('div');
}

export function render(parentElement, parentRoot) {
  const domElement = buildDOM(parentElement);
  parentRoot.appendChild(domElement);
}
