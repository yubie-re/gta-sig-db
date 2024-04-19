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

    # Deduplicating data and keeping the oldest time
    for key in combined:
        unique = {}
        for sig in combined[key]:
            sig_hash = create_signature_hash(sig)
            if sig_hash in unique:
                # If this signature is already in unique, compare the time and keep the oldest
                if 'time' in sig and 'time' in unique[sig_hash]:
                    if sig['time'] < unique[sig_hash]['time']:
                        unique[sig_hash]['time'] = sig['time']
                # Ensure translation or other fields are also updated if necessary
                if 'translation' in sig and 'translation' not in unique[sig_hash]:
                    unique[sig_hash]['translation'] = sig['translation']
            else:
                # Otherwise, add the new signature to unique
                unique[sig_hash] = sig

        combined[key] = list(unique.values())

    return combined

if __name__ == "__main__":
    existing_sigs = load_json('sig_db.json')
    new_sigs = load_json('signatures.json')  # Assuming new data is stored here after tool execution
    updated_sigs = merge_and_deduplicate(existing_sigs, new_sigs)
    save_json(updated_sigs, 'sig_db.json')