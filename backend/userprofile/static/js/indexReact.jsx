var RecipeComponent = React.createClass({
    render: function () {
        var testStyle = { fontSize: '18px', marginRight: '20px' };
        return (
            <div style={testStyle}>
                is this text is 18px tall?
            </div>
        )
    }
});

React.render(
    <RecipeComponent />,
    document.getElementById('content')
)