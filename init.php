<?php

eval( getPluginConf( 'for_rsync' ) );

$jResult .= "plugin.destPathForLink = '".$destPathForLink."';";

$theSettings->registerPlugin("for_rsync");

?>