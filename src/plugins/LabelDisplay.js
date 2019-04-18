import PluginAbstract from './PluginAbstract'

export default class StopMotionDisplay extends PluginAbstract {

    _labels = []

    init() {
        let labelNodes = Array.from(document.querySelectorAll('.motion-label'))
        const getData = (node, attrName) => {
            return node.getAttribute('data-' + attrName)
        }

        this._labels = labelNodes.map((node) => {
            node.style.top = getData(node, 'position-top')
            node.style.left = getData(node, 'position-left')
            
            return {
                id: node.id,
                from: getData(node, 'appear-from'),
                to: getData(node, 'disappear-from'),
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