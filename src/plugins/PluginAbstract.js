
export default class PluginAbstract {

    /**
     * @return  {Promise|boolean}
     */
    init() { return Promise.resolve() }

    onScroll(event) {}

}