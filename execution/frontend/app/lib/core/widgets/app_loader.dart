import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../config/app_env.dart';
import '../theme/e_colors.dart';
import '../theme/e_text_styles.dart';

class AppLoader extends StatefulWidget {
  const AppLoader({super.key, required this.onComplete});

  final VoidCallback onComplete;

  @override
  State<AppLoader> createState() => _AppLoaderState();
}

class _AppLoaderState extends State<AppLoader> with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  bool _curtainOpen = false;

  @override
  void initState() {
    super.initState();
    _ctrl =
        AnimationController(vsync: this, duration: const Duration(milliseconds: 2200))
          ..addListener(() => setState(() {}))
          ..addStatusListener((status) {
            if (status == AnimationStatus.completed) {
              setState(() => _curtainOpen = true);
              Future.delayed(const Duration(milliseconds: 400), widget.onComplete);
            }
          })
          ..forward();
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.sizeOf(context);
    return Stack(
      children: [
        Container(
          color: EColors.surface,
          child: Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                CustomPaint(
                  size: const Size.square(120),
                  painter: _LoaderRingPainter(progress: _ctrl.value),
                ),
                const SizedBox(height: 16),
                Text('${(_ctrl.value * 100).toInt()}%', style: ETextStyles.eyebrow),
                const SizedBox(height: 8),
                Text(AppEnv.clientName.toUpperCase(), style: ETextStyles.svcTag),
              ],
            ),
          ),
        ),
        Positioned(
          bottom: 24,
          left: 24,
          child: Text('47.2529° N  122.4443° W', style: ETextStyles.eyebrow),
        ),
        Positioned(
          top: 0,
          left: 0,
          right: 0,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 400),
            curve: Curves.easeInCubic,
            height: _curtainOpen ? 0 : size.height / 2,
            color: EColors.surface,
          ),
        ),
        Positioned(
          bottom: 0,
          left: 0,
          right: 0,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 400),
            curve: Curves.easeInCubic,
            height: _curtainOpen ? 0 : size.height / 2,
            color: EColors.surface,
          ),
        ),
      ],
    );
  }
}

class _LoaderRingPainter extends CustomPainter {
  const _LoaderRingPainter({required this.progress});

  final double progress;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2 - 4;

    final bgPaint =
        Paint()
          ..color = EColors.secondary.withValues(alpha: 0.15)
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2;

    canvas.drawCircle(center, radius, bgPaint);

    final fgPaint =
        Paint()
          ..color = EColors.secondary
          ..style = PaintingStyle.stroke
          ..strokeWidth = 2
          ..strokeCap = StrokeCap.round;

    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -math.pi / 2,
      progress * 2 * math.pi,
      false,
      fgPaint,
    );
  }

  @override
  bool shouldRepaint(_LoaderRingPainter old) => progress != old.progress;
}
