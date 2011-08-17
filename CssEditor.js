// JQUERY 1.4.4 is a minimum requirement
(function ($) {
    $.fn.tmplEditor = function (options) {
        // there's no need to do $(this) because
        // "this" is already a jquery object
        var formHolder = this;
        var settings = {
            dataNamespace: 'data-editable',
            debug: false,
            callback: function () { alert("Callback called"); return false; }
        };

        if (options) {
            $.extend(settings, options);
        }

        var rules = [];

        var setRule = function (elementSelector, rule, value) {
            if (!(rules[elementSelector])) {
                rules[elementSelector] = [];
            }
            rules[elementSelector][rule] = value;

            if (settings.debug) {
                updateCss();
                console.log(rules);
            }
        }

        var updateCss = function () {
            var css = "";
            for (elem in rules) {
                css += elem;
                css += ' { ';
                for (rule in rules[elem]) {
                    css += rule;
                    css += ':';
                    css += rules[elem][rule];
                    css += ';';
                }
                css += ' }<br />';
            }
            currentCss.html(css);
        }

        var getFormElement = function (key, elemId) {
            switch (key) {
                case "size":
                    // TODO: use a number cycler control
                    var input = $('<input />').attr('id', key + "_" + elemId).val("SIZE INPUT");
                    input.change(function () {
                        var el = '#' + elemId;
                        var rule = 'font-size';
                        var value = $(this).val();

                        setRule(el, rule, value + 'px');
                        $(el).css(rule, parseInt(value));
                    });
                    return input;
                case "fgcolor":
                    // TODO: use a color picker control
                    var input = $('<input />').attr('id', key + "_" + elemId).val("COLOR INPUT");
                    input.change(function () {
                        var el = '#' + elemId;
                        var rule = 'color';
                        var value = $(this).val();

                        setRule(el, rule, value);
                        $(el).css(rule, value);
                    });
                    return input;
                case "bgcolor":
                    // TODO: use a color picker control
                    var input = $('<input />').attr('id', key + "_" + elemId).val("COLOR INPUT");
                    input.change(function () {
                        var el = '#' + elemId;
                        var rule = 'background-color';
                        var value = $(this).val();

                        setRule(el, rule, value);
                        $(el).css(rule, value);
                    });
                    return input;
                default:
                    return $('<input />').attr('id', key + "_" + elemId).val("DEFAULT INPUT");
            }
        };

        var frm = $("<form />");
        var currentCss = $("<div id='current-css' />");

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
        formHolder.html(frm);
        formHolder.after(currentCss);
    };
})(jQuery);

