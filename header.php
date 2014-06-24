<?php
/**
 * The Header for our theme.
 *
 * 
 *
 * @package visual23
 */


?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Visual23 is an Asheville Web Design and Web Development company that specializes in custom WordPress themes and plugins." />
<meta name="keywords" content="asheville web design, asheville web development, asheville web designers, asheville web developers, atlanta web design, atlanta web development, atlanta web designers, atlanta web developers, wordpress developer, web design in asheville, responsive web design" />
<meta name="author" content=" Visual23">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
<link href='http://fonts.googleapis.com/css?family=Droid+Sans:400,700' rel='stylesheet' type='text/css'>
<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">

    
<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->    

    
<?php wp_head(); ?>
    

<script>
    is_home = true;
    var isMobile;
    var isTablet;
    <?php 
    if ( is_mobile() ) {
       echo 'isMobile = true;';
    }
    if ( is_tablet() ) {
        echo 'isTablet = true;';
    } 

    ?>
   </script>
    
</head>

<body <?php body_class(); ?> data-spy="scroll" data-target="#mainHeader" data-offset="150">
    
    <!-- Preloader -->
    <div id="preloader"><div class="loader"></div></div>
    <!-- Primary Page Layout 
  ================================================== -->
    <!-- globalWrapper -->

    <div id="globalWrapper" class="localscroll">
        
        <!-- Start header -->
        <header id="mainHeader">             
          <div class="container">
                <div class="navbar-header">
                  <a class="navbar-brand" href="#introSectionSpace">visual<span>23</span></a>
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                </div>
                <div class="navbar-collapse collapse" id="mainMenu">
                  <ul class="nav navbar-nav">
                    <li id="menu_item1"><a href="#introSectionSpace"></a></li>
                            <li>
                                <a class="roll" href="#aboutSection">
                                    <span data-title="About">About</span>
                                </a>
                            </li>
                            <li>
                                <a class="roll" href="#workSection">
                                    <span data-title="Work">Work</span>
                                </a>
                            </li>
                            <li>
                                <a class="roll" href="#contactSection">
                                    <span data-title="Contact">Contact</span>
                                </a>
                            </li>               
                  </ul>
                </div><!--/.nav-collapse -->
            </div>
        </header>
        <!-- End header -->
    
