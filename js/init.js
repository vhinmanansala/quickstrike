jQuery(document).ready(function($) {
    var APIUrl = "http://quickstrike.com/colors.json";
    
    $('#allColorsButton').click(function() {
        clearThumbnailColors();

        $.getJSON(APIUrl, function(data) {
            $.each(data.colors, function(index, color) {
                createThumbnailColor(color);
            });
        })
    });

    $('#nonSublimationColorsButton').click(function() {
        $.getJSON(APIUrl, function(data) {
            $.each(data.colors, function(index, color) {
                if (color.sublimation_only == 0) {
                    createThumbnailColor(color);
                }
            });
        })
    });

    $('#colorsWrapper').on('click', '.colorContainer', function() {
    	var name = $(this).data('name');
    	var code = $(this).data('color-code');
    	var hexCode = $(this).data('hex-code');

        showDetails(name, code, hexCode);
    });

    function createThumbnailColor(color) {
        var fontColor = "";

        if (isBackgroundDark(color.hex_code)) {
           fontColor = "#ffffff";
        } else {
            fontColor = "#000000";
        }

        var dataAttribute =  "data-name='" + color.name +"' ";
        	dataAttribute += "data-color-code='" + color.color_code + "' ";
        	dataAttribute += "data-hex-code='" + color.hex_code + "'";

        var colorContainer = "<div class='colorContainer' " + dataAttribute + " style='background: #" + color.hex_code + "; color: " + fontColor + ";'>" + color.color_code + "</div>";

        $('#colorsWrapper').append(colorContainer);
    }

    function clearThumbnailColors() {
        // $('.colorContainer').remove();
    }

    function showDetails(name, code, hexCode) {
    	$('#detailWrapper').empty();
    	
    	var fontColor = "";

        if (isBackgroundDark(hexCode)) {
           fontColor = "#ffffff";
        } else {
            fontColor = "#000000";
        }

    	var html =  "<h1>" + name + "</h1>";
    		html += "<strong>Color code: " + code + "</strong><br>";
    		html += "<strong>Hex code: " + hexCode + "</strong><br>";
    		html += "<div class='bigThumbnail' style='background: #" + hexCode + ";'><div style='color: " + fontColor + ";'>" + code + "</div></div>"

    	$('#detailWrapper').append(html);
    }

    function isBackgroundDark(hexCode) {
        var c = hexCode.substring(1);      
        var rgb = parseInt(c, 16);   
        var r = (rgb >> 16) & 0xff;  
        var g = (rgb >>  8) & 0xff;  
        var b = (rgb >>  0) & 0xff;  

        var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

        if (luma < 40) {
            return true;
        }

        return false;
    }
});