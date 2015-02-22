(function (window) {
    window.opspark = window.opspark || {};
    
    var _ = window._;
    
    window.opspark.ui = {
        makeControls: makeControls
    };
    
    // TODO : Separate all style //
    function makeControls(values, settings, view, reset) {
        _.where(settings, {'allowInput': true}).forEach(function (setting) {
            var id, formControls, htmlLabel, htmlControl;
            
            id = setting.id;
            formControls = $("#formControls");
            
            switch (setting.type) {
                case 'range':
                    htmlLabel = '<label id="label-' + id + '" for="' + id + '">' + setting.label + ' : ' + setting.value + '</label>';
                    htmlControl = '<input class="control slider" id="' + id + '" value="' + setting.value + '" step="' + setting.step + '" min="' + setting.min + '" max="' + setting.max + '" type="range" style="width: 200px; height: 20px; -webkit-appearance: slider-horizontal; writing-mode: bt-lr;">';
                    break;
                case 'checkbox':
                    formControls.append('<label id="label-' + id + '" class="checkbox-inline"><input class="control checkbox" id="' + id + '" value="' + setting.value + '" checked type="checkbox"><span>' + setting.label + ' : ' + (setting.value === 1 ? "on" : "off") + '</span></label>');
                    return;
                case 'dropdown':
                    htmlLabel = '<label id="label-' + id + '" for="' + id + '">' + setting.label + ' : </label>';
                    htmlControl = $('<select class="select" id="' + id + '" style="width: 200px; height: 20px; writing-mode: bt-lr;">');
                    $(setting.options).each(function() {
                        var option = $('<option>').attr('value', this.value).text(this.text);
                        if (this.selected) { option.attr('selected', 'selected'); }
                        htmlControl.append(option);
                    });
                    break;
                case 'radio':
                    formControls.append($('<label>').text(setting.label + ' : '));
                    $(setting.options).each(function() {
                        formControls.append('<label id="label-' + id + '" class="radio-inline"><input type="radio" class="control radio" id="' + id + '" name="' + setting.id + '" value="' + this.value + '"' + (this.checked ? 'checked' : '') + '><span>' + this.text + '</span></label>');
                    });
                    return;
                default:
                    break;
            }
            formControls.append(htmlLabel);
            formControls.append(htmlControl);
        });
        
        $(".checkbox-inline").each(function(index) {
            $(this).on("change", function() {
                var value, labelValue, span;
                
                value = $(this.control).is(':checked');
                labelValue = (value ? "on" : "off");
                span = $('span', this);
                span.text(span.text().replace(/:(.*)/, ": " + labelValue));
                
                updateValueForId(this.control.id, value);
            });
        });
        
        $(".slider").each(function(index) {
            $(this).on("input", function() {
                var label = $("#label-" + this.id);
                label.text(label.text().replace(/:(.*)/, ": " + $(this).val()));
            });
            
            $(this).on("change", function() {
                updateValueForId(this.id, parseFloat($(this).val()));
            });
        });
        
        $(".select").each(function(index) {
            $(this).on("change", function() {
                updateValueForId(this.id, $(this).val());
            });
        });
        
        $(".radio-inline").each(function(index) {
            $(this).on("change", function() {
                updateValueForId(this.control.id, $(this.control).val());
            });
        });
        
        function updateValueForId(id, value) {
            values[id] = value;
            
            if (_.where(settings, {'id': id})[0].requireRestart) {
                reset();
            }
        }
        
        if (window.location.href.match(/github.io|github-io/)) {
            $("#controls").append( '<a class="a back">Back...</a>');
        }
        $(document).ready(function(){
            $('a.back').click(function(){
                parent.history.back();
                return false;
            });
        });
    }
    
}(window));
