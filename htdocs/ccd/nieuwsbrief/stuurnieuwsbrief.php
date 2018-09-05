<?php

/* Btje beveiliging tegen feuten */
if ($_GET["foo"] != "bar") die ("MOEHAHAHA");
exit;

/* recipients */
$to  = "Citroen Club Delft <ccd-l@od251.xs4all.nl>";

/* subject */
$subject = "Nieuwsbrief voorjaar 2004";

/* message */
$filename = "voorjaar2004.htm";
$handle = fopen($filename, "r");
$message = fread($handle, filesize($filename));
fclose($handle);

/* To send HTML mail, you can set the Content-type header. */
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n";

/* additional headers */
$headers .= "From: Citroen Club Delft <ccd@oli.tudelft.nl>\r\n";

/* and now mail it */
mail($to, $subject, $message, $headers);
?>
