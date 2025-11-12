<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>jQuery Animate Orbit Example</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

  <style>
    body {
      height: 100vh;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .no-display {
        display: none;
    }

    .header {
      position: relative;
      width: 100vh;
      height: 100vh;
    }

    .header a {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 80px;
      background: rgba(79,163,255,0.9);
      color: white;
      text-decoration: none;
      border-radius: 50%;
      font-weight: 600;
      text-align: center;
      box-shadow: 0 0 15px rgba(79,163,255,0.7);
      transition: 0.3s;
    }

    .header-right {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-size: 1.5rem;
    }

  </style>
</head>
<body>

<?php include('./src/components/header.php'); ?>

  <script>
    $(document).ready(function() {
      const $links = $('.header a');
      const radius = 150;  // orbit size in pixels
      let angle = 0;

      // Animate continuously
      setInterval(function() {
        angle += 0.02; // speed
        $links.each(function(index) {
          const theta = angle + (index * (2 * Math.PI / $links.length)); // spread evenly
          const x = Math.cos(theta) * radius;
          const y = Math.sin(theta) * radius;
          // Use .animate() to move smoothly to new position
          $(this).animate({
            left: 200 + x + 'px',
            top: 200 + y + 'px'
          }, 100);
        });
      }, 100);
    });
  </script>
</body>
</html>
