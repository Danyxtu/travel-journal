import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '90%',
    overflow: 'hidden',
  },
  modalHeader: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 6,
  },
  modalSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
  },
  emojiPreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emojiPreviewText: {
    fontSize: 40,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  labelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 100,
    paddingTop: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  emojiContainer: {
    gap: 8,
    paddingVertical: 4,
  },
  emojiOption: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  emojiOptionSelected: {
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
  },
  emojiText: {
    fontSize: 28,
  },
  gradientContainer: {
    gap: 12,
    paddingVertical: 4,
  },
  gradientOption: {
    width: 64,
    height: 64,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  gradientOptionSelected: {
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientName: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginTop: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  saveButton: {
    flex: 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    flexDirection: 'row',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bottomSpacer: {
    height: 20,
  },
})

 export const gradientOptions = [
    { id: 1, colors: ['#FF6B6B', '#FF8E53'], name: 'Sunset' },
    { id: 2, colors: ['#4E65FF', '#92EFFD'], name: 'Ocean' },
    { id: 3, colors: ['#11998E', '#38EF7D'], name: 'Forest' },
    { id: 4, colors: ['#FFA500', '#FFD700'], name: 'Golden' },
    { id: 5, colors: ['#667EEA', '#764BA2'], name: 'Purple' },
    { id: 6, colors: ['#F857A6', '#FF5858'], name: 'Rose' },
    { id: 7, colors: ['#43E97B', '#38F9D7'], name: 'Mint' },
    { id: 8, colors: ['#FA709A', '#FEE140'], name: 'Candy' },
  ]

export const emojiOptions = ['✈️', '🗼', '🗾', '🏝️', '🗽', '🏛️', '🏖️', '⛰️', '🏔️', '🌍', '🌎', '🌏', '🗺️', '🧳', '🎒']
