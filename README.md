This is a simple prototype I created to be able to edit (and potentially) save edited css using unobtrusive data-* attributes.

To use
======

	$(ready(){
		// Simple default implementation
		$('#editor').tmplEditor();
		
		// Pass in custom options
		var options = {
			'dataNamespace': 'data-editable',
			'callback': function () { /* Custom Callback, can make an ajax call to save css to server eventually */ }
		}
		$('#editor).tmplEditor(options);
	});
	
WARNING
=======
This is a prototype to show potential functionality, this is not production ready code. I still have a lot of work I need to do (including unit tests) to make this a fully functional plugin.