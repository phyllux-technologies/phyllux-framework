#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PHYLLUX PATH EXPLORER
Safe branch generation following phyllotactic patterns (137.508° golden angle)
Generates infinite paths while maintaining link integrity
"""

import math
import os
import json
from pathlib import Path
from typing import List, Dict, Tuple

# Golden angle in radians (137.508°)
GOLDEN_ANGLE = math.radians(137.508)
GOLDEN_RATIO = (1 + math.sqrt(5)) / 2  # φ = 1.618...

# Fibonacci sequence (first 20 numbers)
FIBONACCI = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]

class PhyllotacticPathExplorer:
    """Explores and generates phyllotactic paths following golden angle patterns"""
    
    def __init__(self, base_path: str = "."):
        self.base_path = Path(base_path)
        self.nodes = []
        self.branches = []
        self.visited = set()
        
    def calculate_position(self, node_index: int) -> Tuple[float, float]:
        """
        Calculate position using phyllotactic spiral formula
        r = a * sqrt(n), theta = n * golden_angle
        """
        if node_index == 0:
            return (0.0, 0.0)  # Seed at center
        
        # Phyllotactic spiral: r = a * sqrt(n), theta = n * golden_angle
        a = 1.0  # Scaling factor
        r = a * math.sqrt(node_index)
        theta = node_index * GOLDEN_ANGLE
        
        x = r * math.cos(theta)
        y = r * math.sin(theta)
        
        return (x, y)
    
    def generate_fibonacci_path(self, max_nodes: int = 121) -> List[Dict]:
        """Generate path following Fibonacci sequence"""
        path = []
        
        for i, fib in enumerate(FIBONACCI):
            if fib > max_nodes:
                break
                
            position = self.calculate_position(fib)
            path.append({
                'node': fib,
                'index': i,
                'x': position[0],
                'y': position[1],
                'angle': math.degrees(fib * GOLDEN_ANGLE) % 360,
                'type': 'fibonacci'
            })
        
        return path
    
    def generate_golden_angle_branches(self, num_branches: int = 4) -> List[Dict]:
        """Generate branches at golden angle intervals"""
        branches = []
        
        for i in range(num_branches):
            angle = i * GOLDEN_ANGLE
            angle_deg = math.degrees(angle) % 360
            
            branches.append({
                'branch': i + 1,
                'angle': angle_deg,
                'angle_rad': angle,
                'name': self._get_branch_name(i),
                'path': self._get_branch_path(i)
            })
        
        return branches
    
    def _get_branch_name(self, index: int) -> str:
        """Get branch name based on index"""
        names = [
            'wave-spiral-137',
            'mesh-branch-121',
            'vault-branch-phi',
            'core-spiral-infinity'
        ]
        return names[index % len(names)]
    
    def _get_branch_path(self, index: int) -> str:
        """Get branch path based on index"""
        name = self._get_branch_name(index)
        return f"{name}/index.md"
    
    def validate_links(self, file_path: str) -> Dict:
        """Validate internal links in a markdown file"""
        results = {
            'file': file_path,
            'valid': True,
            'broken_links': [],
            'total_links': 0
        }
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Simple markdown link pattern: [text](path)
            import re
            link_pattern = r'\[([^\]]+)\]\(([^\)]+)\)'
            links = re.findall(link_pattern, content)
            
            results['total_links'] = len(links)
            
            for text, link in links:
                # Skip external links
                if link.startswith('http://') or link.startswith('https://'):
                    continue
                
                # Skip anchor links
                if link.startswith('#'):
                    continue
                
                # Resolve relative path
                file_dir = Path(file_path).parent
                target_path = (file_dir / link).resolve()
                
                # Check if file exists
                if not target_path.exists():
                    results['broken_links'].append({
                        'text': text,
                        'link': link,
                        'resolved': str(target_path)
                    })
                    results['valid'] = False
        
        except Exception as e:
            results['error'] = str(e)
            results['valid'] = False
        
        return results
    
    def generate_navigation_map(self, output_file: str = "navigation-map.json") -> Dict:
        """Generate complete navigation map of all paths"""
        map_data = {
            'seed': {
                'node': 0,
                'position': (0, 0),
                'path': 'phyllux-seed/index.md'
            },
            'branches': self.generate_golden_angle_branches(),
            'fibonacci_path': self.generate_fibonacci_path(),
            'golden_angle': math.degrees(GOLDEN_ANGLE),
            'golden_ratio': GOLDEN_RATIO,
            'pattern': 'phyllotactic_spiral'
        }
        
        # Save to file
        output_path = self.base_path / output_file
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(map_data, f, indent=2)
        
        return map_data
    
    def find_path(self, start: str, end: str) -> List[str]:
        """Find path between two nodes (breadth-first search)"""
        # Simplified path finding
        # In full implementation, would traverse actual file structure
        
        if start == 'seed' and end in ['wave', 'mesh', 'vault', 'core']:
            branch_map = {
                'wave': 'wave-spiral-137/index.md',
                'mesh': 'mesh-branch-121/index.md',
                'vault': 'vault-branch-phi/index.md',
                'core': 'core-spiral-infinity/index.md'
            }
            return ['phyllux-seed/index.md', branch_map.get(end, '')]
        
        return []

def main():
    """Main function for command-line usage"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Phyllux Path Explorer - Generate phyllotactic paths')
    parser.add_argument('--generate-map', action='store_true', help='Generate navigation map')
    parser.add_argument('--validate', type=str, help='Validate links in a file')
    parser.add_argument('--find-path', nargs=2, metavar=('START', 'END'), help='Find path between nodes')
    parser.add_argument('--base-path', type=str, default='.', help='Base path for exploration')
    
    args = parser.parse_args()
    
    explorer = PhyllotacticPathExplorer(args.base_path)
    
    if args.generate_map:
        print("Generating navigation map...")
        map_data = explorer.generate_navigation_map()
        print(f"Navigation map generated: {len(map_data['branches'])} branches")
        print(f"   Golden angle: {map_data['golden_angle']:.3f} degrees")
        print(f"   Fibonacci nodes: {len(map_data['fibonacci_path'])}")
    
    if args.validate:
        print(f"Validating links in {args.validate}...")
        results = explorer.validate_links(args.validate)
        if results['valid']:
            print(f"All {results['total_links']} links valid")
        else:
            print(f"Found {len(results['broken_links'])} broken links:")
            for link in results['broken_links']:
                print(f"   - {link['text']}: {link['link']}")
    
    if args.find_path:
        start, end = args.find_path
        print(f"Finding path from {start} to {end}...")
        path = explorer.find_path(start, end)
        if path:
            print("Path found:")
            for step in path:
                print(f"   -> {step}")
        else:
            print("Path not found")

if __name__ == '__main__':
    main()
