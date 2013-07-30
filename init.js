if(plugin.canChangeMenu())
{
	plugin.createMenu = theWebUI.createMenu;
	theWebUI.createMenu = function( e, id )
	{
		plugin.createMenu.call(this, e, id);
		if(plugin.enabled && plugin.canChangeMenu())
		{
			var el = theContextMenu.get( theUILang.Force_recheck );
			if( el )
				theContextMenu.add( el, ["Mark for Transfer", "theWebUI.perform( 'markforrsync' )"] );
		}
	}
		
	rTorrentStub.prototype.markforrsync = function()
	{
		for( var i = 0; i < this.hashes.length; i++ )
		{
			var mustBeOpened = ( theWebUI.torrents[this.hashes[i]] && !$.trim(theWebUI.torrents[this.hashes[i]].base_path) );
			if(mustBeOpened)
			{
				var cmd = new rXMLRPCCommand( "d.open" );
				cmd.addParameter( "string", this.hashes[i] );
				this.commands.push( cmd );
			}
			var cmd = new rXMLRPCCommand( "d.create_link" );
			cmd.addParameter( "string", this.hashes[i] );
			cmd.addParameter( "string", "base_filename" );
			cmd.addParameter( "string", plugin.destPathForLink );
			cmd.addParameter( "string", "" );
			this.commands.push( cmd );
			if(mustBeOpened)
			{
				var cmd = new rXMLRPCCommand( "d.close" );
				cmd.addParameter( "string", this.hashes[i] );
				this.commands.push( cmd );
			}
		}		
	}
}
