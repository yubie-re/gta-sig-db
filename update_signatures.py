import json

def load_json(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {'RTMA': [], 'INTG': []}

def save_json(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

def create_signature_hash(signature):
    """Create a hash for a signature ignoring time and translation."""
    hashable_part = {key: val for key, val in signature.items() if key not in ['time', 'translation']}
    return json.dumps(hashable_part, sort_keys=True)

def merge_and_deduplicate(old_data, new_data):
    combined = {
        'RTMA': old_data.get('RTMA', []) + new_data.get('RTMA', []),
        'INTG': old_data.get('INTG', []) + new_data.get('INTG', [])
    }

    # Deduplicating data
    for key in combined:
        unique = {}
        for sig in combined[key]:
            sig_hash = create_signature_hash(sig)
            if sig_hash not in unique or not unique[sig_hash]['translation']:
                unique[sig_hash] = sig
        combined[key] = list(unique.values())

    return combined

if __name__ == "__main__":
    existing_sigs = load_json('sig_db.json')
    new_sigs = load_json('signatures.json')
    updated_sigs = merge_and_deduplicate(existing_sigs, new_sigs)
    save_json(updated_sigs, 'sig_db.json')