<div style="display:none">
<?php
$dirf = 'images/flags';
$dir  = scandir($dirf);
foreach ($dir as $file) {
if (($file != '..') && ($file != '.')) {
    echo "<img src='images/flags/$file' />";
    }
}
?>
</div>