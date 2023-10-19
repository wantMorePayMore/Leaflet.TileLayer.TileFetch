
L.TileLayer.TileFetch = L.TileLayer.extend({
  options: Object.assign(L.TileLayer.prototype.options, {
      // headers: {}
      tileRequestParameters: null
  }),
    /**
     * tile fetch request controller Mapping
     */
    _tileRequestControllerMapping: {},
    createTile: function (coords, done) {
        // super.createTile(coords,done)
        var tile = document.createElement('img');
        L.DomEvent.on(
            tile,
            'load',
            L.Util.bind(this._tileOnLoad, this, done, tile)
        );
        L.DomEvent.on(
            tile,
            'error',
            L.Util.bind(this._tileOnError, this, done, tile)
        );

        if (this.options.crossOrigin || this.options.crossOrigin === '') {
            tile.crossOrigin =
                this.options.crossOrigin === true
                    ? ''
                    : this.options.crossOrigin;
        }

        /*
  Alt tag is set to empty string to keep screen readers from reading URL and for compliance reasons
  http://www.w3.org/TR/WCAG20-TECHS/H67
  */
        tile.alt = '';

        /*
  Set role="presentation" to force screen readers to ignore this
  https://www.w3.org/TR/wai-aria/roles#textalternativecomputation
  */
        tile.setAttribute('role', 'presentation');
        
        const fetchId = crypto.randomUUID()
        tile.setAttribute('fetchId', fetchId);
        
        const tileUrl = this.getTileUrl(coords);
        const reqObj = this._buildTileFetch(fetchId, tileUrl)
        reqObj
            .then((response) => response.blob())
            .then((blob) => {
                tile.src = URL.createObjectURL(blob);
            })
            .catch((error) => console.error(error));

        return tile;
    },
    /**
     * build tile request
     * @param {String} tileUrl tile url
     * @returns Fetch Object
     */
    _buildTileFetch(fetchId, tileUrl) {
        let initParms = {}
        if (typeof this.options.tileRequestParameters === 'function') {
            initParms = this.options.tileRequestParameters()
        } else if (typeof this.options.tileRequestParameters === 'object') {
            initParms = this.options.tileRequestParameters
        }
        let controller = new AbortController();
        this._tileRequestControllerMapping[fetchId] = controller

        initParms.signal =  controller.signal;
        return fetch(tileUrl, initParms)
    },
    _onTileRemove(e) {
        e.tile.onload = null;
        let fetchId = e.tile.getAttribute('fetchId')
        if (fetchId) {
            const controller = this._tileRequestControllerMapping[fetchId]
            if (controller && typeof controller.abort ==='function') {
                controller.abort();
                delete this._tileRequestControllerMapping[fetchId]
            }
        }
	},
});

L.TileLayer.tileFetch = function (url, options) {
    return new L.TileLayer.TileFetch(url, options);
};
