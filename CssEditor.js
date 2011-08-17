// JQUERY 1.4.4 is a minimum requirement
(function ($) {
    $.fn.tmplEditor = function (options) {
        // there's no need to do $(this) because
        // "this" is already a jquery object

        var form = this;
        var settings = {
            'dataNamespace': 'data-editable',
            'callback': function () { alert("Callback called"); return false; }
        };

        if (options) {
            $.extend(settings, options);
        }

        var getFormElement = function (key, elemId) {
            switch (key) {
                case "size":
                    var input = $('<input />').attr('id', key + "_" + elemId).val("SIZE INPUT");
                    input.change(function () {
                        $("#" + elemId).css('font-size', parseInt($(this).val()));
                    });
                    return input;
                case "fgcolor":
                    var input = $('<input />').attr('id', key + "_" + elemId).val("COLOR INPUT");
                    input.change(function () {
                        $("#" + elemId).css('color', $(this).val());
                    });
                    return input;
                case "bgcolor":
                    var input = $('<input />').attr('id', key + "_" + elemId).val("COLOR INPUT");
                    input.change(function () {
                        $("#" + elemId).css('background-color', $(this).val());
                    });
                    return input;
                default:
                    return $('<input />').attr('id', key + "_" + elemId).val("DEFAULT INPUT");
            }
        };

        var frm = $("<form />");
        var subBtn = $("<input type='submit' />").click(settings.callback);

        // Get all elements with the namespace attribute
        $('[' + settings.dataNamespace + ']').each(function () {
            // Get the object passed into the data-* attribute
            var $this = $(this);
            var values = $this.data('editable').split(',');
			var h2 = $("<h2 />").html($this.attr('id'));
            var ul = $("<ul />");

            for (var value in values) {
                if (values.hasOwnProperty(value)) {
                    var label = $("<label />").html(values[value]);
                    var element = getFormElement(values[value], $this.attr('id'));

                    var li = $("<li />").append(label).append(element);
                    ul.append(li);
                }
            }
			frm.append(h2);
            frm.append(ul);

        });

        frm.append(subBtn);
        form.html(frm);

    };
})(jQuery);

