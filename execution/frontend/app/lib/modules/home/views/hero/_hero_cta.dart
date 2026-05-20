import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../../../core/config/app_env.dart';
import '../../../../core/router/app_router.dart';
import '../../../../core/theme/e_spacing.dart';
import '../../../../core/theme/personality_theme.dart';
import '../../../../core/widgets/magnetic_widget.dart';

class HeroCta extends StatelessWidget {
  const HeroCta({super.key, required this.pt});
  final PersonalityTheme pt;

  @override
  Widget build(BuildContext context) {
    final showBooking = AppEnv.moduleEnabled('booking');
    return Wrap(
      spacing: ESpacing.md,
      runSpacing: ESpacing.md,
      children: [
        if (showBooking)
          MagneticWidget(
            child: ElevatedButton(
              onPressed: () => Get.toNamed(ERoutes.booking),
              child: const Text('Book Now'),
            ),
          ),
        MagneticWidget(
          child: OutlinedButton(
            onPressed: () => Get.toNamed(ERoutes.contact),
            child: const Text('Get in Touch'),
          ),
        ),
      ],
    );
  }
}
