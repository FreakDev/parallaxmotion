import PluginAbstract from './PluginAbstract'

export default class StopMotionDisplay extends PluginAbstract {

    _labels = []

    init() {
        let labelNodes = Array.from(document.querySelectorAll('.motion-label'))
        const getData = (node, attrName, defaultValue) => {
            let attributeValue = node.getAttribute('data-' + attrName)
            return attributeValue !== undefined ? attributeValue : defaultValue 
        }

        this._labels = labelNodes.map((node) => {
            node.style.top = getData(node, 'position-top')
            node.style.left = getData(node, 'position-left')
            node.style.fontSize = getData(node, 'font-size', '1em')

            return {
                id: node.id,
                from: parseInt(getData(node, 'appear-from'), 10),
                to: parseInt(getData(node, 'disappear-from'), 10),
            }
        })
        
        return true
    }

    onScroll(e) {
        this._labels.forEach((label) => {
            if (label.from <= e.scrollValue && e.scrollValue <= label.to) {
                document.querySelector('#' + label.id).classList.add('show')
            } else {
                document.querySelector('#' + label.id).classList.remove('show')
            }
        })
    }

}