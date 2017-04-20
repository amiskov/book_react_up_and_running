'use strict';

let Excel = React.createClass({
    displayName: 'Excel',

    getInitialState: function() {
        return {
            data: this.props.initialData,
            sortby: null,
            descending: false,
            edit: null, // {row: index, cell: index}
            search: false
        };
    },

    _log: [],

    _logSetState: function(newState) {
        // remember the old state in a clone

        // Генерация строки из объекта через JSON parse<-stringify:
        console.dir(this._log.length === 0 ? this.state : newState);

        console.dir(JSON.parse(JSON.stringify(
            this._log.length === 0 ? this.state : newState
        )));


        this._log.push(JSON.parse(JSON.stringify(
            this._log.length === 0 ? this.state : newState
        )));
        this.setState(newState);
    },


    _preSearchData: null,

    _renderSearch() {
        if (!this.state.search) {
            return null;
        }

        return (
            React.DOM.tr({ onChange: this._search },
                this.props.headers.map(function(_ignore, idx) {
                    return React.DOM.td({ key: idx },
                        React.DOM.input({
                            type: 'text',
                            'data-idx': idx,
                        })
                    );
                })
            )
        );

    },

    componentDidMount: function() {
        document.onkeydown = function(e) {
            if (e.altKey && e.shiftKey && e.keyCode === 82) { // ALT+SHIFT+R(eplay)
                this._replay();
            }
        }.bind(this);
    },

    _replay: function() {
        if (this._log.length === 0) {
            console.warn('No state to replay yet');
            return;
        }
        var idx = -1;
        var interval = setInterval(function() {
            idx++;
            if (idx === this._log.length - 1) { // the end
                clearInterval(interval);
            }
            // this.setState(this._log[idx]);
            this._logSetState(this._log[idx]);
        }.bind(this), 1000);
    },


    _search: function(e) {
        var needle = e.target.value.toLowerCase();

        if (!needle) { // the search string is deleted
            // this.setState({ data: this._preSearchData });
            this._logSetState({ data: this._preSearchData });
            return;
        }
        var idx = e.target.dataset.idx; // which column to search
        var searchdata = this._preSearchData.filter(function(row) {
            return row[idx].toString().toLowerCase().indexOf(needle) > -1;
        });
        // this.setState({ data: searchdata });
        this._logSetState({ data: searchdata });
    },


    _renderTable() {
        return (
            React.DOM.table(null,
                React.DOM.thead({ onClick: this._sort },
                    React.DOM.tr(null,
                        this.props.headers.map(function(title, idx) {
                            if (this.state.sortby === idx) {
                                title += this.state.descending ? ' \u2191' : ' \u2193'
                            }
                            return React.DOM.th({ key: idx }, title);
                        }, this)
                    )
                ),

                React.DOM.tbody({ onDoubleClick: this._showEditor },
                    this._renderSearch(),
                    this.state.data.map(function(row, rowidx) {
                        return (
                            React.DOM.tr({ key: rowidx },
                                row.map(function(cell, idx) {
                                    let content = cell;
                                    let edit = this.state.edit;

                                    if (edit && edit.row === rowidx && edit.cell === idx) {
                                        content = React.DOM.form({ onSubmit: this._save },
                                            React.DOM.input({
                                                type: 'text',
                                                defaultValue: content,
                                            })
                                        );

                                    }

                                    return React.DOM.td({
                                        key: idx,
                                        'data-row': rowidx,
                                        style: {
                                            textAlign: 'right'
                                        }
                                    }, content);
                                }, this)
                            )
                        );
                    }, this)
                )
            )
        );
    },

    _renderToolbar() {
        return React.DOM.button({
                onClick: this._toggleSearch,
                className: 'toolbar',
            },
            'search'
        );
    },

    _toggleSearch() {
        if (this.state.search) {
            // this.setState({
            //     data: this._preSearchData,
            //     search: false,
            // });

            this._logSetState({
                data: this._preSearchData,
                search: false,
            });

            this._preSearchData = null;
        } else {
            this._preSearchData = this.state.data;

            // this.setState({
            //     search: true,
            // });
            this._logSetState({
                search: true,
            });
        }
    },

    _sort(e) {
        let column = e.target.cellIndex;
        let data = Array.from(this.state.data);
        let descending = this.state.sortby === column && !this.state.descending;

        data.sort(function(a, b) {
            return descending ? (a[column] < b[column] ? 1 : -1) : (a[column] > b[column] ? 1 : -1);
        });


        // this.setState({
        //     data: data,
        //     sortby: column,
        //     descending: descending
        // });
        this._logSetState({
            data: data,
            sortby: column,
            descending: descending
        });

        console.log(data);
    },

    propTypes: {
        headers: React.PropTypes.arrayOf(
            React.PropTypes.string
        ),
        initialData: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.any
            )
        )
    },

    _save: function(e) {
        e.preventDefault();
        var input = e.target.firstChild;
        var data = this.state.data.slice();

        data[this.state.edit.row][this.state.edit.cell] = input.value;

        // this.setState({
        //     edit: null, // done editing
        //     data: data,
        // });

        this._logSetState({
            edit: null, // done editing
            data: data,
        });

    },

    _showEditor: function(e) {
        console.log(
            parseInt(e.target.dataset.row, 10),
            e.target.cellIndex
        );
        // this.setState({
        //     edit: {
        //         row: parseInt(e.target.dataset.row, 10),
        //         cell: e.target.cellIndex,
        //     }
        // });
        this._logSetState({
            edit: {
                row: parseInt(e.target.dataset.row, 10),
                cell: e.target.cellIndex,
            }
        });
    },


    render() {
        return (
            React.DOM.div(null,
                this._renderToolbar(),
                this._renderTable()
            )
        );
    }
});

ReactDOM.render(
    React.createElement(Excel, {
        headers: headers,
        initialData: data
    }),
    document.getElementById("app")
);
