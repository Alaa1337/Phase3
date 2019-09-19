var styles;

// this is a wrapped function
(function () {

    // the variables declared here will not be scoped anywhere and will only be accessible in this wrapped function
    var defaultColor = "white",
        highlightColor = "#FEFFD5";

    styles = {
        navitem: {
            base: {
                font: '30pt GoldenSans-Bold',
                align: 'left',
                srokeThickness: 4
            },
            default: {
                fill: defaultColor,
                stroke: 'rgba(0,0,0,0)'
            },
            hover: {
                fill: highlightColor,
                stroke: 'rgba(200,200,200,0.5)'
            }
        },
        gametitle: {
            font: '60pt GoldenSans-Black',
            fill: '#FFFFFF',
            align: 'center'
        }
    };

    Object.assign(styles.navitem.hover, styles.navitem.base);
    Object.assign(styles.navitem.default, styles.navitem.base);

})();
