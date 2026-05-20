import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import '../theme/e_colors.dart';
import '../theme/e_text_styles.dart';

class MarqueeSection extends StatefulWidget {
  const MarqueeSection({super.key});

  @override
  State<MarqueeSection> createState() => _MarqueeSectionState();
}

class _MarqueeSectionState extends State<MarqueeSection> with SingleTickerProviderStateMixin {
  late Ticker _ticker;
  final ScrollController _scrollCtrl = ScrollController();
  double _pos = 0;

  @override
  void initState() {
    super.initState();
    _ticker = createTicker(_onTick)..start();
  }

  void _onTick(Duration _) {
    _pos += 0.5;
    if (_scrollCtrl.hasClients && _scrollCtrl.position.maxScrollExtent > 0) {
      final half = _scrollCtrl.position.maxScrollExtent / 2;
      if (_pos >= half) _pos = 0;
      _scrollCtrl.jumpTo(_pos);
    }
  }

  @override
  void dispose() {
    _ticker.dispose();
    _scrollCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56,
      decoration: BoxDecoration(
        color: EColors.surface,
        border: Border.symmetric(
          horizontal: BorderSide(color: EColors.secondary.withValues(alpha: 0.2), width: 1),
        ),
      ),
      child: SingleChildScrollView(
        controller: _scrollCtrl,
        scrollDirection: Axis.horizontal,
        physics: const NeverScrollableScrollPhysics(),
        child: Row(children: [for (var i = 0; i < 40; i++) _MarqueeItem()]),
      ),
    );
  }
}

class _MarqueeItem extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.star, size: 8, color: EColors.secondary),
        const SizedBox(width: 8),
        Text(
          'Handcrafted in Tacoma  —  Artisan Cheese',
          style: ETextStyles.bodySm.copyWith(
            fontStyle: FontStyle.italic,
            color: EColors.onSurfaceDim,
          ),
        ),
        const SizedBox(width: 64),
      ],
    );
  }
}
