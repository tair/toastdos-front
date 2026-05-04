import { AbstractControl } from '@angular/forms';
import { Gene } from '../../services/submission.service';

/**
 * Clears gene form controls when their locus string is no longer in the
 * submission gene list (for example after a gene was removed).
 */
export function resetGeneControlsIfLocusNotInSubmission(
  submissionGenes: Gene[],
  ...geneControls: (AbstractControl | null)[]
): void {
  const validLocusNames = submissionGenes.map((g) => g.locusName);
  for (const control of geneControls) {
    if (!control) {
      continue;
    }
    if (!validLocusNames.includes(control.value)) {
      control.setValue('');
    }
  }
}
