<?php
/**
 * visual23 functions and definitions
 *
 * @package visual23
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) )
	$content_width = 1020; /* pixels */

if ( ! function_exists( 'visual23_setup' ) ) :
/**
 * Set up theme defaults and register support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which runs
 * before the init hook. The init hook is too late for some features, such as indicating
 * support post thumbnails.
 */
add_filter('show_admin_bar', '__return_false');

add_action('acf/register_fields', 'my_register_fields');
include_once('acf-options-page/acf-options-page.php');

function my_register_fields()
{
	include_once('acf-repeater/repeater.php');
}

function visual23_setup() {
	global $cap, $content_width;

	// This theme styles the visual editor with editor-style.css to match the theme style.
	add_editor_style();

	if ( function_exists( 'add_theme_support' ) ) {

		/**
		 * Add default posts and comments RSS feed links to head
		*/
		//add_theme_support( 'automatic-feed-links' );

		/**
		 * Enable support for Post Thumbnails on posts and pages
		 *
		 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
		*/
		add_theme_support( 'post-thumbnails' );

		/**
		 * Enable support for Post Formats
		*/
		add_theme_support( 'post-formats', array( 'aside', 'image', 'video', 'quote', 'link' ) );

		/**
		 * Setup the WordPress core custom background feature.
		*/
		/*add_theme_support( 'custom-background', apply_filters( 'visual23_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );*/

	}

	/**
	 * Make theme available for translation
	 * Translations can be filed in the /languages/ directory
	 * If you're building a theme based on visual23, use a find and replace
	 * to change 'visual23' to the name of your theme in all the template files
	*/
	//load_theme_textdomain( 'visual23', get_template_directory() . '/languages' );

	/**
	 * This theme uses wp_nav_menu() in one location.
	*/
    /*register_nav_menus(
        array(
            'primary' => 'Header Menu',
            'about-menu' => 'About Menu',
            'services-menu' => 'Services Menu',
            'products-menu' => 'Products Menu',
            'contact-menu' => 'Contact Menu',
            'journal-menu' => 'Journal Menu',
            'my-account-menu' => 'My Account Menu',
            'follow-us-menu' => 'Follow Us Menu'
        )
    );*/
	
    // adds nav menu
/*function top_menu(){

   wp_nav_menu( array(
        'menu'              => '',
        'theme_location'    => 'header-menu',
        'depth'             => 3,
        'container'         => '',
        'container_class'   => '',
        'menu_class'        => 'nav navbar-nav no-float',
       'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
        'walker'            => new wp_bootstrap_navwalker())
    );
}*/

}
endif; // visual23_setup
add_action( 'after_setup_theme', 'visual23_setup' );

/**
 * Register widgetized area and update sidebar with default widgets
 */
function visual23_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'visual23' ),
		'id'            => 'sidebar-1',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
}
//add_action( 'widgets_init', 'visual23_widgets_init' );

/**
 * Enqueue scripts and styles
 */
/*if (!is_admin()) add_action("wp_enqueue_scripts", "my_jquery_enqueue", 11);
function my_jquery_enqueue() {
   wp_deregister_script('jquery');
   wp_register_script('jquery', get_template_directory_uri() . '/includes/js-plugin/jquery/1.8.3/jquery.min.js', false, null);
   wp_enqueue_script('jquery');
}*/

function visual23_scripts() {
    
    // load modernizer
    wp_enqueue_script( 'modernizer', get_template_directory_uri() . '/includes/js/modernizr-2.6.1.min.js', array('jquery'));
    

	// load bootstrap css
	wp_enqueue_style( 'visual23-bootstrap', get_template_directory_uri() . '/includes/resources/bootstrap/css/bootstrap.css' );
        
   
	// load visual23 styles
	wp_enqueue_style( 'visual23-style', get_stylesheet_uri() );
    
    wp_enqueue_style( 'layout-css', get_template_directory_uri() . '/includes/css/layout.css' );    

    
    
	// load bootstrap js
	wp_enqueue_script('visual23-bootstrapjs', get_template_directory_uri().'/includes/resources/bootstrap/js/bootstrap.js', array('jquery'), '', true );

	// load bootstrap wp js
	wp_enqueue_script( 'visual23-bootstrapwp', get_template_directory_uri() . '/includes/js/bootstrap-wp.js', array('jquery'), '', true );

	//wp_enqueue_script( 'visual23-skip-link-focus-fix', get_template_directory_uri() . '/includes/js/skip-link-focus-fix.js', array(), '20130115', true );
    
    // theme specific files
    wp_enqueue_script( 'jquery-mobile', get_template_directory_uri() . '/includes/js-plugin/jquery-mobile/jquery.mobile.custom.min.js', array('jquery'), '', true );
    wp_enqueue_script( 'jquery-form', get_template_directory_uri() . '/includes/js-plugin/neko-contact-ajax-plugin/js/jquery.form.js', array('jquery'), '', true );
    wp_enqueue_script( 'jquery-validate', get_template_directory_uri() . '/includes/js-plugin/neko-contact-ajax-plugin/js/jquery.validate.min.js', array('jquery'), '', true );
    wp_enqueue_script( 'jquery-debouncedresize', get_template_directory_uri() . '/includes/js-plugin/jquery-debouncedresize/jquery.debouncedresize.js', array('jquery'), '', true );
    //wp_enqueue_script( 'jquery-easing', get_template_directory_uri() . '/includes/js-plugin/easing/jquery.easing.1.3.js', array(), '', true );
    wp_enqueue_script( 'jquery-stellar', get_template_directory_uri() . '/includes/js-plugin/parallax/js/jquery.stellar.min.js', array('jquery'), '', true );
    wp_enqueue_script( 'jquery-scrollTo', get_template_directory_uri() . '/includes/js-plugin/parallax/js/jquery.scrollTo.min.js', array('jquery'), '', true );
    wp_enqueue_script( 'jquery-localScroll', get_template_directory_uri() . '/includes/js-plugin/parallax/js/jquery.localScroll.min.js', array('jquery'), '', true );
    wp_enqueue_script( 'jquery-superscrollorama', get_template_directory_uri() . '/includes/js-plugin/superscrollorama/jquery.superscrollorama.js', array('jquery'), '', true );
    wp_enqueue_script( 'jquery-columnize', get_template_directory_uri() . '/includes/js-plugin/jquery-columnizer/jquery.columnizer.js', array('jquery'), '', true );
    wp_enqueue_script( 'swiffy-runtime', get_template_directory_uri() . '/includes/js/lib/swiffy/runtime.js', array(), '', true );
    wp_enqueue_script( 'swiffy-objects', get_template_directory_uri() . '/includes/js/lib/swiffy/swiffy_objects.js', array(), '', true );         
    wp_enqueue_script( 'grid', get_template_directory_uri() . '/includes/js/lib/grid.js', array('jquery'), '', true );
    wp_enqueue_script( 'smoothscroll', get_template_directory_uri() . '/includes/js-plugin/smoothscroll/SmoothScroll.js', array('jquery'), '', true );
    wp_enqueue_script( 'tweenmax', get_template_directory_uri() . '/includes/js-plugin/greensock/TweenMax.min.js', array(), '', true );
    //wp_enqueue_script( 'jquery-uitotop', get_template_directory_uri() . '/includes/js-plugin/uitotop/jquery.ui.totop.min.js', array('jquery'), '', true );
    wp_enqueue_script( 'custom', get_template_directory_uri() . '/includes/js/custom.js', array('jquery'), '', true );
    wp_enqueue_script( 'animation', get_template_directory_uri() . '/includes/js/animation.js', array('jquery', 'jquery-superscrollorama'), '', true );

	/*if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_singular() && wp_attachment_is_image() ) {
		wp_enqueue_script( 'visual23-keyboard-image-navigation', get_template_directory_uri() . '/includes/js/keyboard-image-navigation.js', array( 'jquery' ), '20120202' );
	}*/

}
add_action( 'wp_enqueue_scripts', 'visual23_scripts' );




/**
 * Implement the Custom Header feature.
 */
//require get_template_directory() . '/includes/custom-header.php';

/**
 * Custom template tags for this theme.
 */
//require get_template_directory() . '/includes/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/includes/extras.php';

/**
 * Customizer additions.
 */
//require get_template_directory() . '/includes/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
//require get_template_directory() . '/includes/jetpack.php';

/**
 * Load custom WordPress nav walker.
 */
//require get_template_directory() . '/includes/bootstrap-wp-navwalker.php';

//require_once get_template_directory() . '/Mobile_Detect.php'; 



