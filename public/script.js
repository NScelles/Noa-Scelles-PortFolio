var rotatingGroup = document.getElementById('rotatingGroup');
var rotatingGroup2 = document.getElementById('rotatingGroup2');
var cx = 360;
var cy = 360;
var currentAngle = 0;
var initialY = null;


function animateRotation(startAngle, endAngle, duration) {
    
    var start = null;
    function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        currentAngle = startAngle + progress / duration * (endAngle - startAngle);
        rotatingGroup.setAttribute('transform', 'rotate(' + currentAngle + ' ' + cx + ' ' + cy + ')');
        rotatingGroup2.setAttribute('transform', 'rotate(' + -currentAngle + ' ' + cx + ' ' + cy + ')');
        if (progress < duration) {
        window.requestAnimationFrame(step);
        }
    }
    window.requestAnimationFrame(step);
}

function startTouch(e) {
    initialY = e.touches[0].clientY;
};

function moveTouch(e) {
    if (initialY === null) {
        return;
    }

    var currentY = e.touches[0].clientY;

    var diffY = initialY - currentY;

    // Comparing with 0 to check the direction of the movement.
    if (diffY > 0) {
        // Swiped up, move to the next section.
        fullpage_api.moveSectionDown();
    } else if (diffY < 0) {
        // Swiped down, move to the previous section.
        fullpage_api.moveSectionUp();
    }

    // Reset the initialY for the next comparison.
    initialY = null;
};

document.addEventListener("touchstart", startTouch, false);
document.addEventListener("touchmove", moveTouch, false);


new fullpage('#fullpage', {
    autoScrolling: true,
    loopTop: true,
    loopBottom: true,
    navigation: true,
    scrollHorizontally: true,
    dragAndMove:true,

    onLeave: function(origin, destination, direction) {
        
        origin.item.classList.remove('animate__slideInUp');
        origin.item.classList.add('animate__slideOutLeft');
        var targetAngle = destination.index * 90;// Multipliez par le nombre de degrés que vous voulez tourner par section

        // Mettez à jour l'attribut de transformation du groupe SVG
        animateRotation(currentAngle, targetAngle, 500);   

    },
    afterLoad: function(origin, destination, direction) {  
        destination.item.classList.remove('animate__slideOutLeft');
        origin.item.classList.remove('animate__slideOutLeft');
    }
});