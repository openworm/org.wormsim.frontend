define(function (require) {

    var React = require('react');

    return React.createClass({

        render: function() {
            return (
                React.DOM.a({
                    className: 'btn btn-info pull-right',
                    href: '/org.wormsim.frontend'
                }, React.DOM.i({className: 'icon-home'}, ""))
                );
        }
    });
});